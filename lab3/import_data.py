import csv
from datetime import datetime, time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, Weather, AirQuality, WindDirectionEnum

DATABASE_URL = "postgresql+psycopg2://postgres:password123@localhost:5432/weather_db"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

def parse_wind_direction(direction_str):
    try:
        return WindDirectionEnum[direction_str]
    except KeyError:
        return None

with open("data/global_weather.csv", newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    for row in reader:
        try:
            weather = Weather(
                country=row["country"],
                wind_degree=int(row["wind_degree"]) if row["wind_degree"] else None,
                wind_kph=float(row["wind_kph"]) if row["wind_kph"] else None,
                wind_direction=parse_wind_direction(row["wind_direction"]),
                last_updated=datetime.strptime(row["last_updated"], "%Y-%m-%d %H:%M") if row["last_updated"] else None,
                sunrise=datetime.strptime(row["sunrise"], "%I:%M %p").strftime("%H:%M") if row["sunrise"] else None
            )

            air_quality = AirQuality(
                carbon_monoxide=float(row["air_quality_Carbon_Monoxide"] or 0),
                ozone=float(row["air_quality_Ozone"] or 0),
                nitrogen_dioxide=float(row["air_quality_Nitrogen_dioxide"] or 0),
                sulphur_dioxide=float(row["air_quality_Sulphur_dioxide"] or 0),
                pm2_5=float(row["air_quality_PM2.5"] or 0),
                pm10=float(row["air_quality_PM10"] or 0),
                us_epa_index=int(row["air_quality_us-epa-index"] or 0),
                gb_defra_index=int(row["air_quality_gb-defra-index"] or 0),
                weather=weather
            )

            air_quality.go_outside = (
                weather.wind_kph < 36 and air_quality.us_epa_index <= 2
            )

            session.add(weather)
            session.add(air_quality)

        except Exception as e:
            print(f"Помилка у рядку: {row.get('country', '[без країни]')} → {e}")
            
    session.commit()
    print("Дані імпортовано успішно!")
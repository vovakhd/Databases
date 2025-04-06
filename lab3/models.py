from sqlalchemy import Column, Integer, String, Float, DateTime, Time, Enum, ForeignKey, Boolean
from sqlalchemy.orm import relationship, declarative_base
import enum

Base = declarative_base()


class WindDirectionEnum(enum.Enum):
    N = "N"
    NNE = "NNE"
    NE = "NE"
    ENE = "ENE"
    E = "E"
    ESE = "ESE"
    SE = "SE"
    SSE = "SSE"
    S = "S"
    SSW = "SSW"
    SW = "SW"
    WSW = "WSW"
    W = "W"
    WNW = "WNW"
    NW = "NW"
    NNW = "NNW"

class Weather(Base):
    __tablename__ = "weather"

    id = Column(Integer, primary_key=True)
    country = Column(String, nullable=False)
    wind_degree = Column(Integer)
    wind_kph = Column(Float)
    wind_direction = Column(Enum(WindDirectionEnum))
    last_updated = Column(DateTime)
    sunrise = Column(Time)

    air_quality = relationship("AirQuality", back_populates="weather", uselist=False)

class AirQuality(Base):
    __tablename__ = "air_quality"

    id = Column(Integer, primary_key=True)
    weather_id = Column(Integer, ForeignKey("weather.id"), nullable=False)

    carbon_monoxide = Column(Float)
    ozone = Column(Float)
    nitrogen_dioxide = Column(Float)
    sulphur_dioxide = Column(Float)
    pm2_5 = Column(Float)
    pm10 = Column(Float)
    us_epa_index = Column(Integer)
    gb_defra_index = Column(Integer)

    go_outside = Column(Boolean)

    weather = relationship("Weather", back_populates="air_quality")
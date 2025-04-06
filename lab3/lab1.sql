CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

CREATE TABLE Professor (
    prof_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    gpa DECIMAL(3,2)
);

CREATE TABLE Enrollment (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    professor_id INT,
    grade DECIMAL(3,2),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id),
    FOREIGN KEY (professor_id) REFERENCES Professor(prof_id)
);

INSERT INTO Department (dept_id, dept_name) VALUES
(1, 'Biology'),
(2, 'Computer Science'),
(3, 'Mathematics'),
(4, 'Physics');

INSERT INTO Professor (prof_id, name, salary, dept_id) VALUES
(1, 'Dr. Brown', 85000.00, 1),
(2, 'Dr. Smith', 95000.00, 2),
(3, 'Dr. Johnson', 88000.00, 3),
(4, 'Dr. Williams', 92000.00, 4);

INSERT INTO Course (course_id, course_name, dept_id) VALUES
(1, 'Advanced Algorithms', 2),
(2, 'Molecular Biology', 1),
(3, 'Quantum Mechanics', 4),
(4, 'Linear Algebra', 3);

INSERT INTO Student (student_id, name, gpa) VALUES
(1, 'Alice', 3.8),
(2, 'Charlie', 3.9),
(3, 'David', 3.6),
(4, 'Bob', 3.5);

INSERT INTO Enrollment (enrollment_id, student_id, course_id, professor_id, grade) VALUES
(1, 1, 1, 2, 4.0),
(2, 2, 3, 4, 4.0),
(3, 1, 2, 1, 3.8),
(4, 3, 4, 3, 3.7),
(5, 4, 4, 3, 3.5);
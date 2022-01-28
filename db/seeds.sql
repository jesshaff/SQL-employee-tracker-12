USE employee_db;

INSERT INTO department (department_name)
VALUES
('Human Resources'),
('Legal'),
('Sales'),
('Engineering'),
('Customer Service'),
('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
('HR Corporate Acct Rep', 120000, 1),
('Litigation Assistant', 110000, 2),
('Outside Sales Rep', 100000, 3),
('Quality Engineer', 95000, 4),
('Customer Service Rep', 60000, 5),
('Accounts Payable', 65000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kristin', 'Mercer', 1, 1),
('Reid', 'Huff', 2, 2),
('Taylor', 'Chambers', 3, 3),
('Rece', 'Nash', 4, 3),
('Marshall', 'Russell', 5, 5);
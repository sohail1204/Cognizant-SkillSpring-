import { Trainer } from './trainer';

export const mockTrainers = [
  new Trainer(
    1,
    'John Doe',
    'john.doe@cognizant.com',
    '+1 555-0199',
    'React & Frontend Development',
    ['React', 'Redux', 'JavaScript', 'HTML5/CSS3', 'TypeScript']
  ),
  new Trainer(
    2,
    'Jane Smith',
    'jane.smith@cognizant.com',
    '+1 555-0144',
    'Node.js & Backend Systems',
    ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'GraphQL']
  ),
  new Trainer(
    3,
    'Robert Johnson',
    'robert.johnson@cognizant.com',
    '+1 555-0122',
    'Cloud Native & DevOps',
    ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines', 'Terraform']
  ),
  new Trainer(
    4,
    'Emily Davis',
    'emily.davis@cognizant.com',
    '+1 555-0177',
    'Java Enterprise Architect',
    ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'Apache Kafka']
  )
];

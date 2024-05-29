# FLock Social Media Prototype

This project is a social media prototype developed using a microservice architecture, with a focus on scalability, performance, and maintainability. The frontend is built with Angular and Ionic, while the backend is built with NestJS, Kafka, Scylla DB, and Express-Cassandra. The project is hosted on AWS, with Jenkins for DevOps, Kubernetes for orchestration, EC2 instances for server hosting, S3 buckets for static file storage, and CloudFront for content delivery.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Deployment](#deployment)
  - [Local Development](#local-development)
  - [AWS Deployment](#aws-deployment)

## Description

FLock is a social media platform designed to connect pet owners and their pets. The application aims to provide a platform where pet owners can share their experiences, interact with other pet owners, and find pet-related services.

The project is developed using a microservice architecture, which allows for better scalability, performance, and maintainability. Each microservice is responsible for a specific functionality, such as user management, pet management, post management, and service discovery.

The frontend is built with Angular and Ionic, providing a responsive and user-friendly interface for pet owners to interact with the application. The backend is built with NestJS, a popular Node.js framework, and utilizes Kafka for event-driven communication between microservices. Scylla DB is used as the primary database for storing pet-related data, while Express-Cassandra is used for storing user-related data.

The project is hosted on AWS, with Jenkins for DevOps, Kubernetes for orchestration, EC2 instances for server hosting, S3 buckets for static file storage, and CloudFront for content delivery.

## Installation

To set up the project locally, follow these steps:

1. Install pnpm globally:
   ```
   npm i -g pnpm
   ```

2. Install project dependencies:
   ```
   pnpm i
   ```

## Deployment

### Local Development

To deploy the project locally, follow these steps:

1. Start the Scylla DB Docker container:
   ```
   docker run -it --rm --entrypoint cqlsh scylladb/scylla --network=host
   ```

2. Run the backend microservices:
   ```
   pnpm run start:backend
   ```

3. Run the frontend application:
   ```
   pnpm run start:frontend
   ```

### AWS Deployment

To deploy the project to AWS, follow these steps:

1. Create an EC2 instance for Jenkins DevOps:
   - Launch an EC2 instance on AWS.
   - Install and configure Jenkins on the EC2 instance.
   - Set up the necessary plugins and configurations for Jenkins.

2. Set up Kubernetes cluster:
   - Create a Kubernetes cluster on AWS using tools like EKS, EKSCTL, or Kops.
   - Configure the necessary networking and security settings for the cluster.

3. Deploy microservices to Kubernetes:
   - Create Kubernetes deployment and service YAML files for each microservice.
   - Apply the YAML files to deploy the microservices to the Kubernetes cluster.

4. Set up AWS services:
   - Create S3 buckets for static file storage and configure CloudFront for content delivery.
   - Set up EC2 instances for server hosting and configure load balancing.

5. Configure Jenkins pipeline:
   - Create a Jenkins pipeline to automate the deployment process.
   - Set up the necessary build, test, and deployment stages in the pipeline.
   - Configure Jenkins to deploy the project to the Kubernetes cluster and AWS services.

By following these steps, you can set up and deploy the FLock social media prototype using a microservice architecture in a pnpm monorepo on AWS.





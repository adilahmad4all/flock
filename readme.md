```markdown
# FLock Social Media Prototype

This project is a social media prototype developed using a microservice architecture, with a focus on scalability, performance, and maintainability. The frontend is built with Angular and Ionic, while the backend is built with NestJS, Kafka, Scylla DB, and Express-Cassandra. The project is hosted on AWS, with Jenkins for DevOps, Kubernetes for orchestration, EC2 instances for server hosting, Minio for S3 compatible buckets for static file storage, and CloudFront for content delivery.

## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Deployment](#deployment)
- [Local Development](#local-development)
- [AWS Deployment](#aws-deployment)

## Description

FLock is a social media platform designed to connect pet owners and their pets. The application aims to provide a platform where pet owners can share their experiences, interact with other pet owners, and find pet-related services.

The project is developed using a microservice architecture, which allows for better scalability, performance, and maintainability. Each microservice is responsible for a specific functionality, such as user management, pet management, post management, and service discovery.

The frontend is built with Angular and Ionic, providing a responsive and user-friendly interface for pet owners to interact with the application. The backend is built with NestJS, a popular Node.js framework, and utilizes Kafka for event-driven communication between microservices. Scylla DB is used as the primary database for storing pet-related data, while Express-Cassandra is used for storing user-related data.

The project is hosted on AWS, with Jenkins for DevOps, Kubernetes for orchestration, EC2 instances for server hosting, S3 buckets for static file storage, and CloudFront for content delivery.

## Project Structure

- [deploy]: Holds the deployment Helm files for Kubernetes
- [libs]:
  - [repositories]: Holds the data models, schema, and DTO files for database and GraphQL API
    // Todo: Create custom shims and decorators to support frontend and backend and other databases from the same model class
  - [ui]: Common UI libraries
    // Todo: Introduce Builder.io and Mitosis for native framework components
- [packages]:
  - [client]:
    - [flock]: Angular application for clients
      // Todo: Create an admin application for management
  - [server]:
    - [gateway]: GraphQL gateway for backend that connects to Kafka to direct requests to microservices
    - [auth-server]: Manages authentication and authorization
    - [profile-server]: Manages multiple profiles and avatars under the same account
    - [stories-server]: Manages all posts and comments for users
      // Todo: Create messages and communities microservice

## Getting Started

Clone the repo with:

```bash
git clone https://github.com/your-repository/flock.git
```

## Installation

To set up the project locally, follow these steps:

1. Install pnpm globally: the project uses pnpm workspaces

   ```bash
   npm i -g pnpm
   ```

2. Install project dependencies:

   ```bash
   pnpm i
   ```

## Deployment

### Local Development

To deploy the project locally, follow these steps:

1. Run ScyllaDB and Minio Docker containers

   ```bash
   docker run -it --rm --entrypoint cqlsh scylladb/scylla --network=host
   ```

2. Run the frontend and microservices:

   ```bash
   pnpm all
   ```

### AWS Deployment

To deploy the project to AWS, follow these steps:

1. Create an EC2 instance for Jenkins DevOps:

   - Launch an EC2 instance on AWS.
   - Install and configure Jenkins on the EC2 instance.
   - Set up the necessary plugins and configurations for Jenkins.
   - Configure Jenkins pipeline:
     - Create a Jenkins pipeline to automate the deployment process.
     - Set up the necessary build, test, and deployment stages in the pipeline.
     - Configure Jenkins to deploy the project to the Kubernetes cluster and AWS services.

2. Set up Kubernetes cluster: (skip steps if using EKS or managed services)

   - Create a Kubernetes cluster on AWS using tools like EKS, EKSCTL, or Kops.
   - Configure the necessary networking and security settings for the cluster.
   - Allow these ports in AWS Firewall configuration:
     - Ports for the Control-plane (Master) Node(s):
       - TCP 6443 → For Kubernetes API server
       - TCP 2379–2380 → For etcd server client API
       - TCP 10250 → For Kubelet API
       - TCP 10259 → For kube-scheduler
       - TCP 10257 → For kube-controller-manager
       - TCP 22 → For remote access with ssh
       - UDP 8472 → Cluster-Wide Network Comm. — Flannel VXLAN
     - Ports for the Worker Node(s):
       - TCP 10250 → For Kubelet API
       - TCP 30000–32767 → NodePort Services†
       - TCP 22 → For remote access with ssh
       - UDP 8472 → Cluster-Wide Network Comm. — Flannel VXLAN

   Run the following commands to set up worker and master nodes:

   Master Node

   ```bash
   sudo hostnamectl set-hostname master
   ```

   Worker Node

   ```bash
   sudo hostnamectl set-hostname worker # change name for each worker node
   ```

   All Nodes

   ```bash
   sudo apt-get update && sudo apt-get install -y apt-transport-https curl

   curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
   echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
   sudo apt update

   sudo apt-get install -y kubectl kubeadm kubelet kubernetes-cni docker.io
   ```

   Now, we need to start and enable Docker service:

   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

   For the Docker group to work smoothly without using sudo command, we should add the current user to the `Docker` group:

   ```bash
   sudo usermod -aG docker $USER

   newgrp docker
   ```

   Configure Docker to use the systemd cgroup driver:

   ```bash
   cat << EOF | sudo tee /etc/sysctl.d/k8s.conf
   net.bridge.bridge-nf-call-ip6tables = 1
   net.bridge.bridge-nf-call-iptables = 1
   EOF

   sudo sysctl --system
   ```

   Master Node

   ```bash
   sudo kubeadm config images pull
   echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' | sudo tee /etc/docker/daemon.json
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   sudo systemctl restart kubelet

   sudo kubeadm init --apiserver-advertise-address=172.31.1.24 --pod-network-cidr=172.31.0.0/20 # Use your master node’s private IP
   ```

   Debug commands

   ```bash
   sudo apt install net-tools
   sudo netstat -lnp | grep 1025
   sudo kubeadm reset
   ```

   Master Node

   ```bash
   mkdir -p $HOME/.kube
   sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
   sudo chown $(id -u):$(id -g) $HOME/.kube/config
   ```

   All Nodes

   ```bash
   echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' | sudo tee /etc/docker/daemon.json
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   sudo systemctl restart kubelet

   kubeadm join 172.31.1.24:6443 --token 9auv25.spf0uv6fllmx7bon \
   --discovery-token-ca-cert-hash sha256:202cdc980b7e241b06da20454500f5f8f53dd3320b5859ca2b054eac9ceb5232
   ```

3. Deploy microservices to Kubernetes:

   - Use Helm charts in the deploy folder to deploy the project to Kubernetes

4. Set up AWS services (optional, use S3 to deploy the website or host inside Kubernetes or Minio as object storage):

   - Create S3 buckets for static file storage and configure CloudFront for content delivery.

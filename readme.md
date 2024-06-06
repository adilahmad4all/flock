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

Ports for the Control-plane (Master) Node(s)

1. TCP 6443 → For Kubernetes API server
2. TCP 2379–2380 → For etcd server client API
3. TCP 10250 → For Kubelet API
4. TCP 10259 → For kube-scheduler
5. TCP 10257 → For kube-controller-manager
6. TCP 22 → For remote access with ssh
7. UDP 8472 → Cluster-Wide Network Comm. — Flannel VXLAN
   Ports for the Worker Node(s)

8. TCP 10250 → For Kubelet API
9. TCP 30000–32767 → NodePort Services†
10. TCP 22 → For remote access with ssh
11. UDP 8472 → Cluster-Wide Network Comm. — Flannel VXLAN
    <!-- master -->
    sudo hostnamectl set-hostname master

<!-- worker -->

sudo hostnamectl set-hostname worker # change name for each worker node
<!-- all -->

sudo apt-get update && sudo apt-get install -y apt-transport-https curl

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update

sudo apt-get install -y kubectl kubeadm kubelet kubernetes-cni docker.io
 8. Now we have to start and enable Docker service.

sudo systemctl start docker
sudo systemctl enable docker 
9. For the Docker group to work smoothly without using sudo command, we should add the current user to the `Docker group`.

sudo usermod -aG docker $USER

newgrp docker

cat << EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF

sudo sysctl --system

<!-- master -->

sudo kubeadm config images pull
echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' | sudo tee /etc/docker/daemon.json
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl restart kubelet

<!-- master -->

sudo kubeadm init --apiserver-advertise-address=172.31.1.24 --pod-network-cidr=172.31.0.0/20 # Use your master node’s private IP
<!-- debug -->
sudo apt install net-tools
sudo netstat -lnp | grep 1025
sudo kubeadm reset

<!-- master -->
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

<!-- all -->

echo '{"exec-opts": ["native.cgroupdriver=systemd"]}' | sudo tee /etc/docker/daemon.json
sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl restart kubelet

kubeadm join 172.31.1.24:6443 --token 9auv25.spf0uv6fllmx7bon \
        --discovery-token-ca-cert-hash sha256:202cdc980b7e241b06da20454500f5f8f53dd3320b5859ca2b054eac9ceb5232

#### helm

sudo curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
sudo chmod 700 get_helm.sh
sudo ./get_helm.sh

<!-- add sylladb repo -->
helm repo add scylla https://scylla-operator-charts.storage.googleapis.com/stable
helm repo update

<!-- certificate manager -->
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.5/cert-manager.yaml
helm repo add jetstack https://charts.jetstack.io --force-update
helm install   cert-manager jetstack/cert-manager   --namespace cert-manager   --create-namespace   --version v1.14.5  --set installCRDs=true --set startupapicheck.timeout=10m

helm install scylla-operator scylla/scylla-operator --create-namespace --namespace scylla-operator
helm install scylla scylla/scylla --create-namespace --namespace scylla

helm install scylla-manager scylla/scylla-manager --values examples/helm/values.manager.yaml --create-namespace --namespace scylla-manager


FLANNEL_NETWORK=172.31.0.0/20
FLANNEL_SUBNET=172.31.0.0/20
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true


















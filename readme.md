````markdown
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
````

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

### CLOUD Deployment

To deploy the project to Cloud, follow these steps:

1. Create an EC2 or compute vm instance for Jenkins DevOps:

   - Launch an EC2 instance on AWS.
   - Install and configure Jenkins on the EC2 instance.
   - Set up the necessary plugins and configurations for Jenkins.
   - Configure Jenkins pipeline:
     - Create a Jenkins pipeline to automate the deployment process.
     - Set up the necessary build, test, and deployment stages in the pipeline.
     - Configure Jenkins to deploy the project to the Kubernetes cluster and AWS services.

2. Set up Kubernetes cluster:

   - Configure the necessary networking and security settings for the cluster.
   - Allow these ports in Cloud Provider Firewall configuration:
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

   Create MASTER and WORKER Nodes

RUN THE following in ALL NODES

basic dependencies and update

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https curl
```

{modify master before copy paste depending on node}

```bash
sudo hostnamectl set-hostname master # change master to worker-1 , worker-2 etc
```

Cgroup and iptables for CRI-O
The following code block sets up the necessary configurations for CRI-O (Container Runtime Interface for OCI) to work with Kubernetes. It modifies the system's modules, loads the required modules, sets up the network configurations, and applies the system-wide settings.

```bash
# Create a file to load the required modules for CRI-O
cat <<EOF | sudo tee /etc/modules-load.d/crio.conf
     overlay
     br_netfilter
   EOF
```

```bash
# Create a file to set up the network configurations for CRI-O

cat <<EOF | sudo tee /etc/sysctl.d/99-kubernetes-cri.conf
     net.bridge.bridge-nf-call-iptables  = 1
     net.ipv4.ip_forward                 = 1
     net.bridge.bridge-nf-call-ip6tables = 1
   EOF
```

```bash
# Load the required modules
     sudo modprobe overlay
     sudo modprobe br_netfilter

# Apply the system-wide settings
     sudo sysctl --system
```

Install crio linux OS (Doesnt work for ubuntu 24.04 as there is no release for it)

This script installs CRI-O (Container Runtime Interface for OCI) on a Linux system.

It is designed to work with Kubernetes and is compatible with Ubuntu 22.04 and 20.04.

```bash
# Get the version ID of the operating system
export VERSION_ID=$(cat /etc/os-release | grep VERSION_ID | awk -F"=" '{print $2}' | tr -d '"')

# Set the OS version based on the version ID
export OS_VERSION=xUbuntu_$VERSION_ID

# Set the CRI-O version
export CRIO_VERSION=1.25

# Add the CRI-O repository to the system's sources list
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS_VERSION/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list

# Add the CRI-O repository for specific version to the system's sources list
echo "deb http://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable:/cri-o:/$CRIO_VERSION/$OS_VERSION/ /"|sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable:cri-o:$CRIO_VERSION.list

# Add the GPG key for the CRI-O repository
curl -L https://download.opensuse.org/repositories/devel:kubic:libcontainers:stable:cri-o:$VERSION/$OS_VERSION/Release.key | sudo apt-key --keyring /etc/apt/trusted.gpg.d/libcontainers.gpg add -

# Add the GPG key for the CRI-O stable repository
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/$OS_VERSION/Release.key | sudo apt-key --keyring /etc/apt/trusted.gpg.d/libcontainers.gpg add -

sudo apt-get update
sudo apt-get install cri-o cri-o-runc cri-tools -y

```

run CRI-O

```bash

 sudo systemctl daemon-reload
     sudo systemctl restart crio
     sudo systemctl enable crio
```

install kuberenetese

This script installs the Kubernetes command-line tool (kubectl), kubeadm, and kubelet on a Linux system.

It is compatible with Ubuntu 22.04 and 20.04.

```bash
# Add the Kubernetes apt repository to the system's sources list
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
#create folder for storing key and download kubernetes key to verify the package
sudo mkdir -p /etc/apt/keyrings
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

# Update the package list
sudo apt update

sudo apt-get install -y kubectl kubeadm kubelet kubernetes-cni
```

RUN the following on Master Node
{modify the 13.200.128.128 before copy paste}

```bash

   sudo kubeadm init --apiserver-advertise-address=13.200.128.128 --pod-network-cidr=10.244.0.0/16  # Use your master node’s private IP
```

output:
kubeadm join 10.128.0.2:6443 --token bgmsz4.b8x5033gr8q5dx12 \
 --discovery-token-ca-cert-hash sha256:382543ec70efe0dff65425c3077752d4a253c9b2c209c2fbc1241a0f1187b692

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

verify pods

```bash
kubectl get pods -n kube-system
```

install calico on master node

```bash
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml
```

rerun verify pods to see calico

RUN the following on Worker nodes

```bash
sudo systemctl daemon-reload
        sudo systemctl enable crio --now
```

ON wroker nodes run the join command output from masternode

after joining run on master

```bash
kubectl get nodes
```

test deployment

```bash
kubectl create deployment test-deployment --image nginx:latest --replicas 3
        kubectl expose deployment test-deployment --port 80 --type NodePort
```

check which port is selected for our Nodeport service

```bash
kubectl get svc test-deployment
```

Debug commands

```bash
sudo apt install net-tools
sudo netstat -lnp | grep 1025
sudo kubeadm reset
```



helm repo add --force-update jetstack https://charts.jetstack.io
helm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager \
  --set extraArgs='{--logging-format=json}' \
  --set webhook.extraArgs='{--logging-format=json}' \
  --set cainjector.extraArgs='{--logging-format=json}'

<!-- certificatre manager  -->
dubug
helm uninstall cert-manager -n cert-manager
kubectl delete roles cert-manager-startupapicheck:create-cert -n cert-manager;
kubectl delete serviceaccount cert-manager-startupapicheck -n cert-manager;
kubectl delete serviceaccount default -n cert-manager;
kubectl delete jobs cert-manager-startupapicheck -n cert-manager;
kubectl delete rolebindings cert-manager-startupapicheck:create-cert -n cert-manager;

restart calico 
5  kubectl get pods -n kube-system --show-labels
  156  kubectl delete pods -n kube-system -l k8s-app=calico-node


  kubectl get all -n cert-manager
    kubectl logs -n cert-manager cert-manager-startupapicheck-l2rt9
    kubectl logs -n cert-manager 
  kubectl logs -n cert-manager cert-manager-startupapicheck-l2rt9  
   kubectl describe pod cert-manager-startupapicheck-l2rt9 -n cert-manager



helm install cert-manager jetstack/cert-manager --namespace cert-manager --create-namespace --version v1.5.1 --set startupapicheck.timeout=5m --set installCRDs=true
# EKS_ASGMT
<h1 align=center>EKS assignment</h1>

👉Link to assignment instructions: [here](https://github.com/kura-labs-org/EKS_ASGMT/blob/main/EKS%20assignment.pdf)  

![image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcO3uI0ECzZUMHNrbDPkM2IXhL3MzAQsmGCg&usqp=CAU)

Topology Below!<br>

![image](https://github.com/KennethT404/EKS_ASGMT/blob/main/EKS%20Assignment%20Topology.png)

The goal of this deployment was to successfully host an application with a kubernetes pod. 

Application of choice for this deployment was Nginx.

AWS has a Kubernetes services called EKS or Elastic Kubernetes Service, which was the managed services used to create the cluster and the other components in the cluster shown in the topology. 

Within the Kubernetes cluster, Yaml files were used to create the Ingress Controller, Service and containers in the nodes. 

The ingress controller acts as a load balancer at the cluster level, interfacing with external traffic and redirecting traffic to the appropriate locations internally inside of the Kubernetes cluster. In this cluster, it redirects the traffic from the VPC load balancer to the Service. 

The service is a module in Kubernetes that can act a load balancer forwards traffic to a pod. Kubernetes is able to automatically spin up and replace broken or dead pods but each pod has its own IP Address. Because the pods are configured to be the same aside from IPs, a service will be able to find the pods based on the selector the nodes and pods are given. NodePort will direct the traffic to the node then to the pods that match the name of the app. It is important to keep in the mind to keep the name of the app in the deployment yaml and the service yaml the same so the service can point it to the correct pods. 

The flow of traffic goes from the end user to the Load Balancer and is then redirected toward the Ingress controller inthe cluster. However, there is an IAMpolicy that allows for traffic incoming to the cluster. This acts as a firewall to protect the cluster itself from harmful attacks.

After it passes into the clister, the Ingress controller will direct the traffic directly from port 8o to the service. This service will then find the node and enter the node through a provisioned port, via port 31515 in my case. From here the traffic will redirect to an app called ‘nginx’. This name is shared by both pods in the node so the traffic will be redirected to either to enable high availability. 

![image](https://github.com/KennethT404/EKS_ASGMT/blob/main/nginx%20running%20on%20load%20balancer%20dns.PNG)

This architecture allows for fault tolerance due to the nature of the deployments in Kubernetes. There will ALWAYS be a set number of pods spun up based on the configuration of the deployment. This ensures that the application is fault tolerant at the pod level. 

There are also multiple firewalls in place including the aforementioned IAMpolicy that will protect the cluster from attacks but the Load balancer itself has its own security group or a type of firewall that AWS provides. Here, we can allow traffic from different ports and from specified sources if needed. 

To additionally increase the availability and fault tolerance, we can create a second availability zone to provide resiliency at the node level as well. 


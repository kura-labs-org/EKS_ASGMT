# EKS_ASGMT

# Task - Running NGINX in a Kubernetes cluster by using Amazon's EKS Service

NGINX is a web server or a computer program that holds many files to start up a service or web application. Primarily, NGINX is a popular open-source software to run web applications securely. NGINX's web server differentiates from other web server as it also gives following services: <br>

* Proxy - Allows one device or the host to send traffic to another device or the cilent to give them access to applications
* Reverse Proxy - The cilent sends requests back to the hosts
* Load Balancing - Acts as a reverse proxy to give access for a host to access the cilent's application or files<br>
* Microservices - Nginx can be integrated with microservice applications, which holds no limit for any scaling issues<br>
* Cloud - Nginx is an open-source software and compatible with the cloud, which is also open-source and freely accessible from anywhere<br>
* Security - As Nginx is an open-source webserver, it is also accessible and possibly vunlerable to hacker attacks or sudden misconfigurations. Nginx is always <br>
* being maintained to ensure the best security when using its app. <br>
* Web and Mobile Applications - Since Nginx is a web-server, its main purpose is to help deploy web and mobile applications efficently and securely <br>
* API Gateway - API's can be used with Nginx to receive data from other sources if neccessary<br>

Since NGINX is open-source and supports many functions for a website to function, it is a recommended software to use for deploying web applications. To deploy many web applications at once, NGINX can also be integrated with Kubernetes. Kubernetes is responsible for making many pods that holds many containers and each container is customized from an image and holds the files. To deploy those files on the web, there must be port mapping to ensure the files are read from the Kubernetes clusters and NGINX can be used for this purpose. <br>

To integrate Kubernetes with NGINX, a Kubernetes cluster must be made first. 

```
To make a kubernetes cluster, use the following command: 
eksctl cluster create --name ----
```
* ---- is the name assigned to the cluster. In this demonstration the cluster was named mycluster04. <br>

<html>
     <h1>
        <img style="float: center;" src=pictures/1.png width="1000" />
     </h1>
</html> 

To ensure the cluster is running, type the following command:
```
eksctl get cluster
```

<html>
     <h1>
        <img style="float: center;" src=pictures/2.png width="1000" />
     </h1>
</html> 

Run the command:
```
aws eks describe-cluster --name ---- --query "cluster.identity.oidc.issuer"
```

<html>
     <h1>
        <img style="float: center;" src=pictures/4.png width="1000" />
     </h1>
</html> 








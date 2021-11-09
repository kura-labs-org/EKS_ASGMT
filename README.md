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

1. To integrate Kubernetes with NGINX, a Kubernetes cluster must be made first. To make a kubernetes cluster, use the following command: 

```
eksctl cluster create --name '----'
```

* ---- is the name assigned to the cluster. In this demonstration the cluster was named mycluster04. In this documentation, 'name' will be referring to the name of the cluster you named. <br>

<html>
     <h1>
        <img style="float: center;" src=pictures/1.png width="1000" />
     </h1>
</html> 

2. To ensure the cluster is running, type the following command:
```
eksctl get cluster
```
Once again, this command shows if the cluster was created and is currently running. 

<html>
     <h1>
        <img style="float: center;" src=pictures/2.png width="1000" />
     </h1>
</html> 

3. Run the command:
```
aws eks describe-cluster --name ---- --query "cluster.identity.oidc.issuer --output text"
```
This command shows the url specified from an AWS account. Providing the url is important because future AWS commands to create clusters will show up on the AWS GUI with account that had the same url. 

<html>
     <h1>
        <img style="float: center;" src=pictures/4.png width="1000" />
     </h1>
</html> 

4. Run the command:
```
aws eks describe-cluster --name m ---- --query "cluster.identity.oidc.issuer" --output text
```

<html>
     <h1>
        <img style="float: center;" src=pictures/5.png width="1000" />
     </h1>
</html> 

5. Run the command:
```
eksctl utils associate-iam-oidc-provider --cluster ---- --approve
```

This command creates the cluster on the specified AWS account. If you received an error, run the AWS config command and make sure you provide a access key, secret access key, and the correct availability zone. 

<html>
     <h1>
          <img style = "float:center;" src=pictures/6.png width="1000" />
     </h1>
</html>

6. Run the command:
```
aws iam list-open-id-connect-providers
```
Connect-providers should show your AWS account number, the url provided, and other Amazon Resource Names (ARN) that defines the AWS account resources.                                                                
                                                                 
<html>
     <h1>
          <img style = "float:center;" src=pictures/7.png width="1000" />
     </h1>
</html>

7. Run the commands:
```
curl -o rbac-role.yaml https://raw.githubusercontent.com/RobinNagpal/kubernetes-tutorials/master/06_tools/007_alb_ingress/01_eks/rbac-role.yaml

curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.3.0/docs/install/iam_policy.json
```

Running the two commands above, we are retrieving two files, a yaml file and a jspn file from two different Github accounts. The yaml and json files are named rbac-role.yaml and iam_policy.json respectively. The yaml file will be reponsible to make a Kubernetes cluster and the json file provides permissions and restrictions to using some AWS services. 

<html>
     <h1>
          <img style = "float:center;" src=pictures/8.png width="1000" />
     </h1>
</html>

8. Run the command:
```
kubectl apply -f rbac-role.yaml
```

Running the apply command with rbac-role.yaml runs the lines of code in rbac-role.yaml where it specifies to how traffic goes to and from the cluster and specifying other service permissions. 
                                                                                                 
9. To confirm it was created, run the command:
```
kubectl get serviceaccount
```

<html>
     <h1>
          <img style = "float:center;" src=pictures/9.png width="1000" />
     </h1>
</html>

10. Run the command:
```
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json
```
By using the iam_policy.json file, specifies permissions for many AWS services in order to run NGINX on a Kubernetes cluster.

<html>
     <h1>
          <img style = "float:center;" src=pictures/10.png width="1000" />
     </h1>
</html>

11. Run the command:
```
eksctl create iamserviceacount --cluster='name'  
```
This enables you as the IAM user for the cluster you created. You can further assign or take away permissions or give authority to others. 
'name' is the name of your cluster. In this demonstration, my cluster's name is cluster04. 

12. Run the command:
```
eksctl create iamservice --cluster='name' namespace=kube-system --name=aws-load-balancer-controller --attach-policy-arn=arn:aws:iam::'amazonaccountnumber':policy/AWSLoadBalancerControllerIAMPolicy --override-existing-serviceaccounts --approve
```
The command above will offically link the cluster and grant it IAM User access to assign service permissions. The changes can be seen on AWS Cloudformation. 

<html>
     <h1>
          <img style = "float:center;" src=pictures/12.png width="1000" />
     </h1>
</html>

13. Run the command:
```
kubectl apply \ --validate kubectl apply \
    --validate=false \
    -f https://github.com/jetstack/cert-manager/releases/download/v1.5.4/cert-manager.yaml
```
The following command creates many legal certificates for every ingress controllers and the cluster. 

                                                                  
<html>
     <h1>
          <img style = "float:center;" src=pictures/13.png width="1000" />
     </h1>
</html>

14. Run the command:
```
curl -o v2_3_0_full.yaml https://github.com/kubernetes-sigs/aws-load-balancer-controller/releases/download/v2.3.0/v2_3_0_full.yaml
```
Another file v2.3.0_full.yaml is needed from the Github repo shown above to specify the load balancer rules and ports for the Kubernetes nodes, pods, and containers.                                                                    

<html>
     <h1>
          <img style = "float:center;" src=pictures/14.png width="1000" />
     </h1>
</html>

15. Run the command:
```
kubectl apply -f v2_3_0_full.yaml
```
Webhooks are created in order to connect all the Kubernetes components to make them communicate efficently with one another. 

<html>
     <h1>
          <img style = "float:center;" src=pictures/15.png width="1000" />
     </h1>
</html>

16. Run the command:
```
kubectl get deployment -n kube-system aws-load-balancer-controller
```
This shows confirmation the Kubernetes Deployment has a load balancer attached to it.                                                                  
                                                                  
<html>
     <h1>
          <img style = "float:center;" src=pictures/16.png width="1000" />
     </h1>
</html>

17. Run the commands:
```
kubectl apply -f 'name'.yaml
```

```
kubectl apply -f 'name'.yaml
```

Run 'kubectl apply -f 'name'.yaml' command twice in order to make two different yaml files. One yaml file is to create the deployment and nginx service port. The other yaml file is needed to create ingress traffic. 
'name' = Specify the names of the two yaml files


                                                                                                                                    
<html>
     <h1>
          <img style = "float:center;" src=pictures/18.png width="1000" />
     </h1>
</html>

18. Run the command:
```
kubectl get ingress.networking.k8s.io
```

This shows the url where the Nginx application is running. 

<html>
     <h1>
          <img style = "float:center;" src=pictures/20.png width="1000" />
     </h1>
</html>

19. Type in the address url in a web browser provided from "kubectl get ingress.networking.k8s.io" command. If successful, Nginx should incorporated with your application. 
<html>
     <h1>
          <img style = "float:center;" src=pictures/21.png width="1000" />
     </h1>
</html>

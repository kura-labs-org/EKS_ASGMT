# EKS_ASGMT
<h1 align=center>EKS assignment</h1>

Welcome to today's EKS assignment, to view the assignment, navigate to EKS assignment.pdf.   

- Be sure to include the following below in your pull request: 

***Requirements:*** 
- [x]Screenshot of completed assignment.
- [x]Topology of what was builded.
- [x]EXTRA!! Now deploy your own Python application with a load balancer.

👉Link to assignment instructions: [here](https://github.com/kura-labs-org/EKS_ASGMT/blob/main/EKS%20assignment.pdf)  

![image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcO3uI0ECzZUMHNrbDPkM2IXhL3MzAQsmGCg&usqp=CAU)

<h2>Goal</h2>

The goal of this exercise is to follow directions to create a kubernetes nginx service on AWS using eksctl, kubectl, and aws. This application will be deployed on AWS using two yaml files.

<h2>Instructions</h2>

All the Instructions are in the pdf, so, the button instructions here will briefly explain what is going on instead.

We set up two yaml files:

---First Yaml File -Build two replica nodes that will hold the nginx services and expose port 80 on the front

---Second Yaml file -Utilize a nodePort service to connect the nodes to the open world to the a random internal port that is open on each node. Usually this is in the 3xxxx

<h4>Cluster formation</h4>

First, we must create a new cluster. That can be achieved through ekctl cluster create --name "name"

<h4>Pod Set up</h4>

In order to facilitate a cert set up and allow role management, we first must use an openID cluster service and connect the openid provider to our created cluster. This allows use to utilize yaml files to create iam policies through our aws cli via json files.

We will apply a role-based access control yaml first. This is jused in conjunction with kubernetes to establish control for ingress controller and the ALB. it does 3 things. It creates the cluster role and the account and then binds the role to the account.

The next step is use eksctl to create a service account to associate the current policy with.

Following this, we use a yaml to craete a cert manager service pod that runs on the nodes to be used along with the ingress controller.
<h4>Load Balancer Deploy</h4>

Last thing to do is create the load balancer using another yaml and then connecting that load balancer to the clusters.

<h4>Application Deployment</h4>
Now we want to use first and second yaml to deploy the application and open the port up to the ALB that was newly created.

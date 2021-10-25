# EKS Assigment
## 1. Create a Kubernetes container that hosts an nginx application.
## 2. Create a pod for the container to live in.
## 3. Create a service type load balancer that allows us to foward the port of where the application is being hosted in the container so that i can be accesses from the pod that hosts the container.
## 4. input your AWS creadentials using AWS configure and make sure your user has the right proviledges to use EKS in your account, create a cluster using AWS's EKS service that would host the pod we created.
## 5. Create a service node port that will expose the port that our load balancer is using in order to access it through the internet.
## 6. Run the command "kubectl get all" to make sure your cluster is running and see which port it is using to run your application.
## 7. Run the command "kubectl get service -o wide" to look at the ip information of your EC2 that were created in your cluster by AWS.
![Screenshot 2021-10-21 205648](https://user-images.githubusercontent.com/60336145/138764943-2a4ead77-98ff-4879-8c5c-9f8175946b82.png)
## 8. Select one of your EC2 and change the security group to allow traffic from anywhere from the port that was specified in the nodeport service 
![Screenshot 2021-10-21 205648_LI](https://user-images.githubusercontent.com/60336145/138766988-4d1d7326-750b-4675-973d-9b41dedd2309.jpg)
## 9. put the public IP of your EC2 in your browser and add the port with a colon EX: 3.13.242.244:23454
![Screenshot 2021-10-21 205617](https://user-images.githubusercontent.com/60336145/138764921-b9828fc9-70ec-4d35-bbcf-d623f07e50ed.png)

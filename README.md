# EKS Assignment 

## Purpose 

Define purpose/importance here.

## Steps to replicate

### Create a cluster on AWS and an nginx deployment file

1. Make sure you have kubectl and eksctl installed on your system.
2. Use eksctl to create a new cluster on AWS(this will take about 10-20 minutes)
    ```
    eksctl create cluster --name mycluster01
    ```
3. Now create a yaml file which will declare the deployment and services for nginx application. 
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sample-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: public.ecr.aws/nginx/nginx:1.19.6
          ports:
            - name: http
              containerPort: 80

---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service-nodeport
spec:
  type: NodePort
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80


```
4. Create a separate file yaml file for our ingress controller.
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: simple-ingress
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: instance
spec:
  rules:
    - http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service-nodeport
                port:
                  number: 80

```
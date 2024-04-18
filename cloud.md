


# Migrating to CLOUD > DevOPS

    > AWS, GCP, Azure, ...











                           instance EC@ (AMI 2023 OS) / node-e-shop
+--------------------------+--+
|                             |
|                             |
|                             |
|                             |
|                             |
|                             <-------------- internet ---------->
|                             |
|                             |
|                             |
|                             |
|                             <----------- SSH ----- login --- ec2-user@
+-----------------------------+










    1. install nodejs

yum install https://rpm.nodesource.com/pub_18.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y 
yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1

    2. install postgresql server



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

    sudo dnf install nodejs --nogpgcheck
    sudo yum install https://rpm.nodesource.com/pub_18.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y 
    sudo yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1

2. install postgresql server

    sudo dnf update
    sudo dnf install postgresql15.x86_64 postgresql15-server -y

3. install git

    sudo dnf install -y

4. export database -> .sql

    - sudo postgresql-setup --initdb
    - sudo systemctl start postgresql
    - sudo systemctl status postgresql

5. configure postgresql user/password

    https://devopscube.com/install-configure-postgresql-amazon-linux/

    - qazwsx21
    - sudo -u postgres psql
    - ALTER USER postgres PASSWORD 'myPassword';
    - sudo mcedit /var/lib/pgsql/data/postgresql.conf
    - sudo mcedit /var/lib/pgsql/data/pg_hba.conf
    - sudo systemctl restart postgresql
    - psql -U postgres

6. import database <- .sql

7. push local repo -> remote

8. clone <-- repo

9. run app






DEVELOPMENT MACHINE
--------------------------
local repository --- remote ----> github
                                    |
<--------- clone -------------------+
--------------------------
AWS MACHINE



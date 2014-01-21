KidsCare
========

KidsCare

## Git

1. Install [Git Extensions](https://code.google.com/p/gitextensions/)
2. Choose "OpenSSH" as your SSH client.
3. Generate SSH keys

```
    $ cd ~/.ssh
    $ ssh-keygen -t rsa -C "your_email@example.com"
    # Creates a new ssh key, using the provided email as a label
    # Generating public/private rsa key pair.
    # Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]

    Your identification has been saved in /c/Users/you/.ssh/id_rsa.
    # Your public key has been saved in /c/Users/you/.ssh/id_rsa.pub.
    # The key fingerprint is:
    # 01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@example.com
```

Copy the public key `~/.ssh/id_rsa.pub` to the Git repository administrator.

4. Clone Git repository

```
    $ cd ~/workspace
    $ git clone https://github.com/rogeronline/KidsCare.git
```

## JDK

1. Install [JDK 7]
2. Set `JAVA_HOME=C:\Program Files\Java\jdk1.7.x_xx` and add `%JAVA_HOME%\bin` to your `PATH` variable.

## Eclipse

1. Download Eclipse

[Eclipse IDE for Lean DI Developers](https://eclipse.neo.ondemand.com/)

2. Import Maven project

Import > Existing Maven Projects

## Maven

### Install Maven

1. Download [Maven 3](http://maven.apache.org/download.cgi)
2. Set `M2_HOME=C:\maven-3.x.x` and add `%M2_HOME%\bin` to your `PATH` variable.
3. Download `settings.xml` and put the file into your `%USERPROFILE%\.m2` folder (e.g. `C:\Users\I068400\.m2` for Windows 7).

### Build

Build to WAR package

    $ mvn clean package

Run local development Jetty server.

    $ mvn jetty:run

Visit in browser:

    http://localhost:8080/kidscare

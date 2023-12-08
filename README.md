# INFORMATION ASSURANCE - FINAL PROJECT
by **Group 1 - BSCS 3A**
- Venn Delos Santos
- Arjun Rashid Dimanarig
- Marc Christian Tumaneng
- Selwyn Kent Oñedo

## STEP-BY-STEP DOCUMENTATION



### 1. Install Headless Raspbian OS into Raspberry Pi. ###

 - Raspberry Pi Imager is the quick and easy way to install Raspberry Pi OS and other operating systems to a microSD card, ready to use with your Raspberry Pi.
 Here is the link for the [Raspberry Pi Imager](https://www.raspberrypi.com/software/)
 ![Screenshot 2023-12-07 145420](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/e2574685-2757-4d49-a721-188f7f518d8a)

 - Open Raspberry Pi Imager. Choose Raspberrry Pi Device, Operating System, and Storage.
 ![Screenshot 2023-12-07 135408](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/ca526d3e-fe83-4ab8-bef8-6a7b401f41e4)

 - In this project, we choose **_Raspberry Pi 3_** as device, **_Raspberry Pi OS (Legacy)_** as operating system, and our **_32GB SD Card_** as storage.
 ![Screenshot 2023-12-07 135512](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/9e5fe390-dc24-4570-9de6-0588a0fa450a)
 ![Screenshot 2023-12-07 135541](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/5d91f9da-4a42-40e0-a2b4-148fe5e9640d)
 ![Screenshot 2023-12-07 135558](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/95cc7542-6144-4873-b516-4fb3a3f675a0)

 - After choosing the preferred device, OS, and storage, click **Next**.
 ![Screenshot 2023-12-07 135616](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/15ea5bcb-cfd5-4235-8742-77087116cb53)

 - ...and click **Edit Settings** to customize the OS Settings.
 ![Screenshot 2023-12-07 135634](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/d99d262e-2f36-4056-9eb7-4661712a5f01)

 - In the OS Customization, we set the host, username, and password as **group1**. We configure our wireless LAN available which is **CSPC BayanihanNet** and set the wireless LAN   country to **PH.** Lastly, we set our timezone to **Asia/Shanghai** since they have the same timezone (GMT+8) with Manila, then click **Save**.
   
 ![Screenshot 2023-12-07 135752](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/d4dc817d-04e5-49c0-831c-e9bda0386683)

 - Don't forget to enable SSH and use password authentication, then click **Save**.
 ![Screenshot 2023-12-07 135810](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/8f8dd69e-c5e5-44f0-a515-b23864ae8db8)

 - Click **Yes** to apply our customized settings.
   ![Screenshot 2023-12-07 140959](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/b1f04a91-fa82-44d9-ae70-e237221f1837)

 > [!WARNING]
 > Make sure to backup all existing data in the SD card to avoid deletion while formatting.
 - A warning will appear that all existing data on our SD card will be erased if we continue on our installation. Click **Yes** since our SD card have no existing files that needs to be backed up.
  ![Screenshot 2023-12-07 135833](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/5378f87f-03f9-45ab-a6c3-e25cba283b61)

 - OS writing on our SD card will then start

![Screenshot 2023-12-07 135844](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/c75ec2ca-df1e-4e13-9766-88eadc471491)

![Screenshot 2023-12-07 135942](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/e8c848b2-cafc-4923-a4c2-77301fdccd3a)

 - After writing, verification will start.
  
![Screenshot 2023-12-07 140853](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/9e465d13-36c9-4316-ba62-5fdd8aafb04c)

 - Wait until the verification hits 100%, and write succesfull prompt will appear. In this part, it's now safe to eject our SD card from the PC.

![Screenshot 2023-12-07 140905](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/33d244ad-11b9-401e-a302-57ad6fb60c1f)

> [!NOTE]
> Plug in the SD card first on Raspberry Pi before proceeding to the next step.

### 2. Connect to Raspberry Pi via SSH (Secure Socket Shell) then update the OS ###
 - In the command prompt, type SSH to access the network protocol. Then type the following command:
   - ssh username@hostname (e.g. group1@group1)
   - sudo apt update
   - sudo apt upgrade

 ![2(1)](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/a105c0e9-650b-4103-b8b2-03f07588c171)
 
 ![3](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/2bd078ad-1d70-44a7-9209-68f742ac4425)

### 3. Install LAMP Stack. LAMP stands for Linux, Apache, MySQL, and PHP. 
 - This stack is typically installed together in order to enable a server to host dynamic websites and web apps written in PHP.
Here are the tutorials on how to install LAMP stack [[1]](https://ostechnix.com/install-apache-mysql-php-lamp-stack-on-ubuntu-18-04-lts/)[[2]](https://linuxhint.com/install-phpmyadmin-raspberry-pi/)
 - To install the stack, type the following commands on our command prompt connected to Raspberry Pia via SSH.
   + **_sudo apt install apache2_**
     ![4 1](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/0b82373e-fbfe-4572-8fcd-dfe0758f123c)
   + **_sudo apt install mariadb-server_**
     ![5 1](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/e7b4c2e9-88a2-45f9-a672-dcc3fe3a9b45)
   + **_sudo mysql_secure_installation_**
     ![6 1](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/468ada53-65e1-4321-abd0-a0b4fd3a479f)
   + **_sudo apt install php libapache2-mod-php php-mysql_**
     ![7 1](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/fc1b5ee6-b857-46ea-bee6-34b3fc01a40d)
   + **_sudo apt-get install php_**
     ![8](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/7df70005-43fa-4811-8b08-3ffa124a92c4)
   + sudo apt install phpmyadmin
     ![9](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/2f41ba4e-7455-48b4-8e6d-bfa89566ab4a)

### 4. Connect to Raspberry Pi via VNC
 - Install RealVNC® Viewer to the device you want to control from via this [link](https://www.realvnc.com/en/connect/download/viewer/)
 - Before opening VNC on our PC, access first the Raspberry Pi Configuration Tool to enable VNC on the OS via the **_sudo raspi-config_** command.
 - Using the arrows, navigate to **'Interfacing Options'** > **'VNC'**, then choose **'Yes'** and select **'OK'** 
    ![10](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/85362fe9-0d18-4b24-9aec-d6f09b7ebd34)
    ![11](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/d84694be-b952-497a-aa6b-dabb42637f1e)
    ![12](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/5353298f-e2ed-4100-9b13-a810158868bb)
    ![13](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/b4f418d4-fd99-468c-95d8-3c4560da19ae)
- On the device you will use to take control, run RealVNC Viewer and enter the private IP address in the search bar. If the screen of the Raspberry Pi appeared on RealVNC, it means that it already established connection and control on the Raspberry Pi. 
   ![15](https://github.com/kentzyyo/INFO-ASSURANCE/assets/61936205/323d006d-f178-412f-bacc-375844c40927)















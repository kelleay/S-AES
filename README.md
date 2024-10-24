# Simple-AES Algorithm
This project implements the Simple-AES algorithm.The algorithm flow is shown in the following figure：
<!-- 算法流程图片 -->
<img src="https://github.com/kelleay/S-AES/blob/master/images/%E7%AE%97%E6%B3%95%E6%B5%81%E7%A8%8B%E5%9B%BE.png" style="width:700px; height: 800px">

## Table of Contents
- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Run](#run)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Report](#report)
  - [The First Pass](#the-first-pass)
  - [The Second Pass](#the-second-pass)
  - [The Third Pass](#the-third-pass)
  - [The Fourth Pass](#the-fourth-pass)
  - [The Fifth Pass](#the-fifth-pass)

## Introduction
This project implements the S-AES encryption and decryption algorithm, which can encrypt a 16-bit binary plaintext and a key to produce a ciphertext by inputting them; at the same time, this project also supports encrypting and decrypting any length of character string plaintext (converted to ASCII code); the project also supports multiple encryption and decryption methods, such as double encryption and triple encryption; the project also implements a method to break the cipher by means of a meet-in-the-middle attack, which requires inputting any pair of plaintext and ciphertext; the project also implements encrypting longer plaintext messages in CBC (cipher block chaining) mode.

## Dependencies
The following technologies are used in this project:
- Front-end: HTML5 + CSS3 + JavaScript
- Back-end: Node.js

## Installation
In order to set up the project well, you need to make sure to install the dependencies required for the project. Run the following command on the terminal:
```
npm install
```

## Run
Enter the following command to run the project：
```
nodemon app.js
```
At this point, the project's backend server has started, and we can now open index.html in a browser to access the project's web page.

## Project Structure
The structure of the project is shown below：
- `node_modules`: The project's dependency packages
- `public/`: Front-end files
    - `index.html`: Client web page
    - `index.css`: Stylesheets for the project, defining the visual appearance.
    - `main.js`: JavaScript files that provide interactivity and dynamic features.
    - `allKeys.html`: A page that displays all keys
- `images`: some images of report
- `route-handle/AES/`: Provides a handler for routes
    - `AES.js`: Contains the primary implementations of algorithms.
    - `service.js`: Provides utility functions commonly used in the project.
    - `constant.js`: Stores constant values used throughout the application.
- `routes`: Provides interface services for clients to access servers
    - `AES.js`: Provides an interface for client AES encryption and decryption requests
- `package.json`: Records the dependencies installed by the project
- `package-lock.json`: Records the dependencies installed by the project
- `app.js`: The main application file that initializes the Flask app, handles routing, and serves as the entry point for
  the application.
- `README.md`: Provides an overview of the project.

## API Documentation

| Endpoint        | Method | Request Body                                                                                                     | Response                                          |
|------------------|--------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------|
| `/yuanshen/encrypt`       | POST   | ```json { "plainText": "Text to be encrypted", "Key": "Encryption key" } ```                                  | ```json { "data": "Encrypted ciphertext" } ```   |
| `/yuanshen/exencrypt`     | POST   | Same as `/yuanshen/encrypt`                                                                                              | Same as `/yuanshen/encrypt`                               |
| `/yuanshen/decrypt`       | POST   | ```json { "cipherText": "Text to be decrypted", "Key": "Decryption key" } ```                                 | ```json { "data": "Decrypted plaintext" } ```    |
| `/yuanshen/exdecrypt`     | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/dencrypt`      | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/dexencrypt`    | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/ddecrypt`      | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/dexdecrypt`    | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/tencrypt`      | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/texencrypt`    | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/tdecrypt`      | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/texdecrypt`    | POST   | Same as `/yuanshen/decrypt`                                                                                              | Same as `/yuanshen/decrypt`                               |
| `/yuanshen/crack`         | POST   | ```json { "plains": ["Array of plaintexts"], "ciphers": ["Array of ciphertexts"] } ```                        | ```json { "keys": ["Possible array of keys"], "len": "Length required for cracking", "time": "Time taken for cracking" } ``` |
| `/yuanshen/cbcencrypt`    | POST   | ```json { "plainText": "Text to be encrypted", "Key": "Encryption key", "IV": "Initialization vector" } ```  | ```json { "data": "Encrypted ciphertext" } ```   |
| `/yuanshen/cbcdecrypt`    | POST   | Same as `/yuanshen/cbcencrypt`                                                                                           | ```json { "data": "Decrypted plaintext" } ```    |

## Report
The following figure shows the main interface of the client:
<br><img src="https://github.com/kelleay/S-AES/blob/master/images/%E4%B8%BB%E7%95%8C%E9%9D%A2.png" />
<br>

### The first pass
Write and debug programs according to S-AES algorithm, provide GUI decryption to support user interaction. The input can be 16bit data and 16bit key, and the output can be 16bit ciphertext.
- The encryption result is shown in the following figure:
  <img src="images/二进制加密.png" />
- Some of the encryption results are shown in the table below：

| PlainText        | Key              | CipherText       |
|------------------|------------------|------------------|
| 1111000011110000 | 1111111100000000 | 0100011000110001 |
| 1111000011111111 | 1111111100000000 | 0011011000110100 |
| 1111000011110000 | 1010101010101010 | 0011000100100011 |
| 0101010101010101 | 1010101010101010 | 1000101010010110 |
| 0101010101010101 | 1111111111111111 | 1111101011101110 |

- The decryption result is shown in the following figure:
  <img src="images/二进制解密.png" />
- Some of the decryption results are shown in the table below:

| CipherText       | Key              | PlainText        |
|------------------|------------------|------------------|
| 1111000011110000 | 1111111100000000 | 1111000011110000 |
| 0011000100100011 | 1010101010101010 | 1111000011110000 |
| 1111101011101110 | 1111111111111111 | 0101010101010101 |
| 0000111100001111 | 1111000011110000 | 0011110100110101 |
| 1111111111111111 | 1111000011110000 | 1010010010011010 |

#### The second Pass
Considering the "algorithm standard", everyone needs to use the same algorithm flow and transformation unit (replacement box, column confusion matrix, etc.) when writing the program to ensure that the algorithm and the program can run properly on heterogeneous systems or platforms.
There are two groups of A and B students (select the same key K); Then the program written by the students of group A and B encrypts the plaintext P to obtain the same ciphertext C; Or Group B students receive ciphertext C encrypted by group A program, and use Group B program to decrypt it to get the same P as A.

- The encryption results of Group A students are shown below：
  <img src="images/交叉测试A.png" />
- The encryption results of Group B students are shown below：
  <img src="images/交叉测试B.png" />

The results showed that the students in group A and Group B had the same results

#### The third Pass
To extend its usefulness, the data input of the encryption algorithm can be an ASII-encoded string (grouped into 2 Bytes), and the corresponding output can be an ACII string (most likely garbled).

- The extended encryption result test is shown in the figure below:
  <img src="images/扩展加密.png" />
- The expanded decryption result test is shown in the figure below:
  <img src="images/扩展解密.png" />

#### The fourth Pass
1. Double Encryption
Extending the S-AES algorithm with double encryption, the packet length is still 16 bits, but the key length is 32 bits.

- The result of double encryption is shown below:
  <img src="images/双重加密.png" />
- The result of double decryption is shown below:
  <img src="images/双重解密.png" />
- I also extended the double encryption and decryption, as shown in the figure below:
  <img src="images/扩展双重加密.png" /> <br>
  <img src="images/扩展双重解密.png" />
<br>

3. Intermediate Encounter Attack
Assuming you find one or more plain and ciphertext pairs using the same Key, try using the meet-in-the-middle attack method to find the correct key Key(K1+K2).

- First, I entered a pair of plaintext ciphertext to crack, and found more than 40,000 keys, as shown in the figure:
  <img src="images/破解1-1.png" />
- Then, If there are more than ten keys, I will generate a link to see all the possible keys:
  <img src="images/破解1-2.png" />
- The result is shown in the figure:
  <img src="images/破解1-3.png" />
<br>
- At this time, I used two pairs of clear ciphertext to crack, and only two keys were found, as shown in the figure:
  <img src="images/破解2.png" />
<br>
These keys were verified to be correct

<br>
5. Triple Encryption
The S-AES algorithm is extended by triple encryption, and one of the following two modes is selected:<br>
(1) Triple encryption and decryption according to the mode of 32 bits Key(K1+K2) <br>
(2) Use 48bits(K1+K2+K3) mode for triple encryption and decryption.

- I chose the second type of encryption: (2) Use 48bits(K1+K2+K3) mode for triple encryption and decryption.
- The result of triple encryption is shown below:
  <img src="images/三重加密.png" />
- The result of triple decryption is shown below:
  <img src="images/三重解密.png" />
- I also extended the triple encryption and decryption, as shown in the figure below:
  <img src="images/扩展三重加密.png" /> <br>
  <img src="images/扩展三重解密.png" />
<br>

#### The fifth Pass
Based on S-AES algorithm, long plaintext messages are encrypted using Cipher Block chain (CBC) mode. Note that the initial vector (16 bits) is generated and needs to be shared by both encryption and decryption parties. <br>
If the ciphertext is encrypted in CBC mode and attempts to replace or modify the ciphertext group, then decrypt it, compare the decryption results before and after the ciphertext is modified.

- CBC encryption is shown in the figure: 
  <img src="images/cbc加密.png" />
- The following figure shows how to decrypt the ciphertext without replacing it:
  <img src="images/cbc解密.png" />
- The following figure shows the replacement decryption of the ciphertext: Replace ciphertext µùiÀ¦"óTséÎÆm¨/ì  with  AµùBÀ¦"CTséÎDm¨/ì
  <img src="images/cbc替换解密.png" />
<br>
In general, the result of decryption after substitution is quite different from that of plaintext



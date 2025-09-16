# Revision Questions

## Table of Contents

1. [Node.js](#nodejs)
2. [Express.js](#expressjs)
3. [Database & MongoDB](#database--mongodb)
4. [Mongoose, Redis & LLM/AI](#mongoose-redis--llmai)

## Node.js:

1. What is Node.js & V8 Engine. Difference between them?
2. How C++ understand JS Code?
3. Old method to export a file & import it, basically what is CJS Module?
4. New method to export & import a file, basically what is MJS Module?
5. What are processors, single core & multi-core processor?
6. What is Context-Switching, Concurrency & Parallelism?
7. What is thread, types of thread, types of threading?
8. What is timers, file access, http request?
9. What is Global Object?
10. What is Libuv?
11. How libuv works, does Node.js use multiple thread?
12. Why can't we access libuv functionality directly through the V8 Engine?
13. How do Node.js APIs, V8 Engine & Libuv interact?
14. Is browser have Libuv?
15. What is Server, types of server?
16. What is the difference b/w software server & hardware server?
17. What is Client?
18. What is IP Address, Port No.?
19. What is the meaning of Server Listening?
20. What is Socket & Web Socket, Difference b/w them?
21. How to create a server using Node.js?
22. How to create routes using Node.js?
23. How to host a server using Node.js?
24. What is Monolithic Architecture?
25. What is Micro-Service Architecture?
26. Problems or issues in Monolithic Architecture?
27. What is API, types of APIs?
28. What is CRUD Operations & HTTP methods?
29. Why are APIs paid even if the project is open-source like deepseek?

---

## Express.js

30. What is Express.js, features of express.js?
31. Why do we need Express.js when we have Node.js?
32. When should we use Express.js?
33. How to install Express.js?
34. How to create a server using Express.js?
35. How to install Nodemon?
36. How to start server using Nodemon?
37. How to make routing using Express.js?
38. What is the meaning of this symbols & why do we use in routing (?, +, \*)?
39. How to make dynamic routing in express.js?
40. What is the difference b/w JSON vs JS Object?
41. How to read or fetch data in express?
42. How to create data in express?
43. How data travels in HTTP methods?
44. What is postman?
45. What can postman do?
46. How to get data which users send through request body?
47. Why we use app.use(express.json());?
48. Why we use JSON instead of JS Object?
49. What is parser?
50. What is the work of content-type which is present inside header?
51. Why app.use() & app.get, app.post, app.put, app.patch, app.delete they both works
    different?
52. When we send data through postman than why it will not update our data isnide the file,
    & how the data will show in postman?
53. Why we always send res.send() every time?
54. CRUD Operation code part?
55. What is query parameter, why we use this?
56. What is route handler, how to run multiple callback function or route handler?
57. Different ways to write route handler?
58. What is middleware, why we use them, type of middleware?
59. What is Authentication & Authorization?
60. What is status code & categories of status code?
61. What is error handling?
62. Why we don't use JSON.parse() to parse JSON data, why we use express.json()?

---

## Database & MongoDB

64. What is Database, Types of Database?
65. Why we need database?
66. Difference b/w Database vs Database Management System?
67. Why Excel Sheet is not consider as a database?
68. Why we don't store Videos & Images in binary form in any Database, why we use links to
    store them?
69. Why Videos & Images are consider as semistructured data format?
70. What is SQL & ACID property?
71. Is SQL Database stored row wise in secondary memory?
72. Drwabacks of using SQL in social media platform?
73. What is Normalization, primary key, foreign key?
74. What is collection, document, field in MongoDB?
75. What is joins?
76. What is vertical & horizontal scaling?
77. Why SQL Database don't scale horizontally well?
78. What is sharding?
79. How sharding works?
80. What are the challenges in sharding?
81. What is replica, why we need this & types of replica?
82. What is load balancers?
83. What are the challenges of distributed system?
84. What is CAP Theorem?
85. How Database stores in secondary memory either MongoDB or SQL?
86. Why we don't save data in the form of array either sorted or unsorted?
87. What is indexing, why we need this?
88. How binary search works?
89. Why we don't use Binary Search Tree & AVL Tree?
90. How data is stored in secondary memory & how operations are perform?
91. Why we use B+ Tree instead of B Tree?
92. Why MongoDB bydefault use 4kb block size to read data?
93. What is internal node, leaf node, left & right pointer, sibling pointer?
94. What is padding in data?
95. How range query works?
96. What is BSON & why we prefer this over JSON?
97. How to install MongoDB?
98. What is Cluster & difference b/w Server vs Cluster?
99. What is MongoDB Atlas & Compass?
100.  How to create Database in Compass?
101.  How to connect Backend to Database?
102.  What is MongoClient, url, dbName, db, collection, .finally(), client etc?
103.  Why we didn't make db & collection await?
104.  How to get ALL documents/data?
105.  If we use special character in username or password than why we need to convert it
      like for @ we write %40 etc?
106.  What if Databse & Collection is not present is it throw an error or create it?
107.  What if we remove .toArray() from .find({}), & same with await?
108.  Why we say Cursor to collection.find({})?
109.  Why we use for...of loop with await?
110.  How to insert single or multiple data, delete single or multiple data, update etc?

---

## Mongoose, Redis & LLM/AI

111. What is Mongoose, & why we use it over MongoDB?
112. What are the advantages of Mongoose?
113. What is Schema?
114. What are the benefits of Schema?
115. How to install Mongoose?
116. How to connect mongoose to database?
117. How to create Schema?
118. What is Model & how to create it?
119. How to create one document or store it?
120. How to create multiple document & store it?
121. How can we create our own custom collection name?
122. What is \_\_v:0, which is automatically added in every document?
123. How to perform CRUD operation Using Express with Mongoose?
124. Why we connect Backend to DB & than listen at that server?
125. What is Validation & Schema Validation?
126. What are the types of Schema Validation?
127. Why we need API Level Validation?
128. When we update any document than our schema validators will not check/run?
129. Why we don't store password as plain text?
130. What is hashing?
131. Why we don't use encryption instead of hashing?
132. Why we need salting when we already have hasing?
133. What is the difference b/w Database leak vs Databse hack?
134. What is Encryption & Decryption, & it's types?
135. What is bcrypt, & how to install it?
136. What is bcrypt.genSalt(), bcrypt.hash(), bcrypt.compare()?
137. What is rounds, what does it mean for?
138. How bcrypt works?
139. How it compares?
140. WHat are the limitations of bcrypt?
141. What is npm validator.js?
142. How to install validator.js?
143. What is SessionId?
144. What is Digital Signature?
145. How it works?
146. What is JWT, & it's structure, pros & cons?
147. How it works, & JWT flow for Authentication?
148. Difference between localStorage, sessionStorage & cookies?
149. What is cookie-parser, how to install & use it?
150. How to insatll JWT & use it?
151. How to add expiry date & what is iat, what happen when we don't add expiry date?
152. What is Refresh Tokens, why do we need them?
153. How Refresh Token works, & middleware?
154. What are Methods, & how to create it?
155. What is Environment variable?
156. How to make Environment variable?
157. What is process.env?
158. What is Dotenv, & how to install it?
159. What is Express Router, why do we need?
160. How to make express router?
161. What is Redis, Key Features, Example Usage?
162. Where Redis is used, Methods to use Redis?
163. How to install Redis in our project?
164. How to connect Redis?
165. How to add expiry time in Cookies?
166. How to get data or decode JWT Token?
167. Why JWT token automatically attach iat means creation time?
168. What is Rate Limitor, Why do we use this?
169. What are the comman strategies for Rate Limiting?
170. How to get IP Address?
171. Implementation of Fixed Window Method, & problems?
172. Implementation of Sliding Window Method?
173. How to add data or remove data by range & calculate the total number of data in
     sorted set?
174. How to install & use crypto library?
175. What is LLM like GPT(Generative pre-trained Transformer)?
176. What is Transformer?
177. What is Token, & positioning of Token?
178. What is MCP Server?
179. What is AI Agent, How to make it?
180. How to take user input from terminal?

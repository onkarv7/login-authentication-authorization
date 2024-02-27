# Login authentication authorization
### Tech Stacks
```python
Node JS , Express JS , Mongo DB , Mongoose , JOI , JWT , Postman , bcryptjs , dotenv , nodemoon
```

## Register   
#### use postman

Use route https://login-787q.onrender.com/auth/register with POST method and pass 
to register user

```bash
https://login-787q.onrender.com/auth/register
```
```bash
{
    "username" :"onkarvasav",
    "email"    :"onkargmail.com",
    "password" : "onkarvasav"
}
```

## Login  
#### use postman

Use route https://login-787q.onrender.com/auth/login with POST method and pass 
to login and it will generate the JWT TOKEN

```bash
https://login-787q.onrender.com/auth/login
```
```bash
{
    "email"    :"onkargmail.com",
    "password" : "onkarvasav"
}
```


## Users  
#### use postman

Use route https://login-787q.onrender.com/auth/user with GET method and pass 
then it will show all the users.

```bash
https://login-787q.onrender.com/auth/user
```

## Secure Route Post 
#### use postman

Use route https://login-787q.onrender.com/auth/post/post with GET method and it will generate the post, but before that you need to pass the JWT TOKEN which is generated when you LOGIN

```bash
https://login-787q.onrender.com/auth/post/post

```


## License

[MIT](https://choosealicense.com/licenses/mit/)

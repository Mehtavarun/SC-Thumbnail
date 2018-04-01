# SC-Thumbnail
This is image resizing app that uploads the image and then resize the image( to 50x50) and send the edited image to user as download. This app used jwt for user verification.
## Getting things Started
To run your the app on your machine:
1.Clone the repository or download on desktop, move into the folder of repository.
2.Run the following command to install all packages.
```
npm install
```
that will install all the required  dependencies on your machine.
3.After all the modules are downloaded, run 
```
npm start
```
### Built With
This was built using:
1.[JWT](https://jwt.io/introduction/)
```
jwt.sign({user}, 'supersafesecretkey', (err, token)=>{})

jwt.verify(token, 'key', (err, authData)=>{})
```
2.[JIMP](https://github.com/oliver-moran/jimp)
```
jimp.read('path.jpg').then(( image)=>{

			image.resize(x, y) //resizing image
			.quality(90)  //quality of image
			.write('.path/x.jpg'); //saving new resized image			

		}).catch((err)=>{
			throw err;
		})
```
[Multer](https://github.com/expressjs/multer),
[Json-Patch](http://jsonpatch.com/),
[Morgan](https://github.com/expressjs/morgan) 
Morgan Example:
```
app = require('express')();
app.use(morgan('dev'));
```

#### Project Description
This project has protected endpoints with jwt, uses mock user login for testing of api's. There are different api that have different task of resizing images, authenticating, using middleware.


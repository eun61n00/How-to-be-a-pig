const helloPromise = new Promise((resolve, reject) => {
	// pending 상태
	isSuccess = true;

	if (!isSuccess) {
		reject(false); //catch 호출 (rejected)
		return;
	}

	console.log("1");
	setTimeout(() => {
		resolve(); //then 호출 (fulfilled)
	}, 2000);

});

helloPromise
	.then((res) => {
		console.log("2");
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(), 2000);
		});
	})
	.then((res) => {
		console.log("3");
	})
	.catch((err) => {
		console.log(err);
	})
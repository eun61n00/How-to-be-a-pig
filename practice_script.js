const helloPromise = new Promise((resolve, reject) => {
	// 생성 자체는 pending
	let isSuccess = true;

	if (!isSuccess) {
	  reject("실패"); // catch 호출
	  return;
	}

	console.log("1등");
	setTimeout(() => {
	  resolve(); // 2초 뒤에 then 메서드 호출
	}, 2000);
  });

  helloPromise
	.then((res) => {
	  console.log("2등");
	  return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), 2000);
	  });
	})
	.then((res) => {
	  console.log("3등");
	})
	//두번째 then 입장에서는 앞에있는 then이 또 새로운 promise 객체를 리턴하기 때문에 얘의 resolve를 만나면 두번째 then을 실행시킴
	.catch((err) => {
	  console.log(err);
	});
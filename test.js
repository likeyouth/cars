var arr=[
  {
		_id: 5ce961881f611603a83c243c,
    carId: 'CL-507',
    carType: '万象-K786',
    route: '5路',
    carNumber: '浙A83B29',
    startTime: '1970-01-01',
    rest: '10%',
    status: '熄火',
    distance: '662公里',
    driveDistance: '654公里',
  },
  {
    _id: 5ce961881f611603a83c243c,
    carId: 'CL-507',
    carType: '万象-K786',
    route: '5路',
    carNumber: '浙A83B29',
    startTime: '1970-01-01',
    rest: '7%',
    status: '熄火',
    distance: '662公里',
    driveDistance: '654公里',
    __v: 0
  },
  {
    _id: 5ce961a866550c3698538080,
    carId: 'CL-507',
    carType: '万象-K786',
    route: '5路',
    carNumber: '浙A83B29',
    startTime: '1970-01-01',
    rest: '18%',
    status: '启动',
    distance: '662公里',
    driveDistance: '654公里',
    __v: 0
  }
]

for (var i=0;i<arr.length;i++){
	console.log(arr[i]._id.toString())
}

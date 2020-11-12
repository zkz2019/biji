let arr = [1, 2, 3, 4, 5, 6, 7, 8]

function mapArr() {
  arr1: for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 5; j++) {
      console.log('i,j', i, j)
      if (i == 5) break arr1
    }
  }
}

mapArr()

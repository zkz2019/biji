function* func() {
    console.log('one');
    yield "1";
    console.log('two');
    yield "2";
    console.log('three');
    yield "3";

}

let f = func();
f.next();
// console.log('f.next()',f.next());
for (const { key, value } of func()) {
    console.log('key,value', key, value);
}
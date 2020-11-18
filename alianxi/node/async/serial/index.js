let logTime = name => console.log(`log... ${name}` + new Date().toLocaleString);

exports.callback = () => {
    setTimeout(() => {
        logTime("callback1");
        setTimeout(() => {
            logTime("callback2")
        }, 100)
    }, 500)
}

const promises = (name, out) => new Promise(resolve => {
    setTimeout(() => {
        logTime(name)
        resolve();
    }, out)
})

exports.promise = () => {
    promises("promise 1 ", 500)
        .then(promises("promise 2 ", 100).then(promises("33333", 0)))

        
}


exports.generator = () => {
    const generators = function* (name) {
        yield promises(name + 1)
        yield promises(name + 2)
        yield promises(name + 3)
    }

    let co = generators => {
        console.log('generators', generators);
        if (it = generators.next().value) {
            it.then(() => {
                co(generators);
            })
        } else {
            return;
        }
    }
    co(generators("aaaaa"));
}

exports.asyncAwait = async () => {
    await promises("asyncAwait 1 ", 500);
    await promises("asyncAwait 2 ", 300);
    await promises("asyncAwait 3 ", 100);
}
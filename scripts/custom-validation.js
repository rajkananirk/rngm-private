$.validator.addMethod("alphaOnly", function (value, element) {
    return this.optional(element) || /^[a-zA-Z]+$/.test(value);
}, "Only alphabetic characters are allowed!");
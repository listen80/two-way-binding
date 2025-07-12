
const parser = new DOMParser();

export default (template) => {
    const body = parser.parseFromString(`<body>${template}</body>`, 'text/html').querySelector('body');
    return {
        template:body.querySelector('template')?.content,
        script: body.querySelector('script'),
        style: body.querySelector('style'),
    }
};

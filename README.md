# Hapi on Eixo X

> A kickstarter for node js hapi with handlebars templating

Nós organizamos a estrutura da seguinte forma:

##assets

Colocamos aqui os recursos installados pelo bower e outros ativos que são estáticos, bem como ativos gerados por scripts de publicação.
Essa pasta está publica no Hapi. Todos os arquivos desta pasta estão acessíveis em "/assets/*"

##templates
Deixamos os arquivos de templates para geração de views. Na versão básica estamos utilizando [Handlebars](http://handlebarsjs.com/). Você pode configurar as rotas e utilizar o reply.view;

##layouts
Deixamos os layouts aqui. Existe o padrão "default.html" pré configurado mas você pode utilizar qualquer outro em sua view. A extensão .html será automaticamente adicionada.

> reply.view('myview', null, { layout: 'another_layout' });

##helpers
Aqui se adiciona os módulos que podem ser utilizados nas views. É recomendável deixar como module.exports para se utilizar com require. Como exemplo, o **helper** **fortune.js** com o conteúdo:

```
module.exports = function () {
    const fortunes = [
        'Heisenberg may have slept here...',
        'Wanna buy a duck?',
        'Say no, then negotiate.',
        'Time and tide wait for no man.',
        'To teach is to learn.',
        'Never ask the barber if you need a haircut.',
        'You will forget that you ever knew me.',
        'You will be run over by a beer truck.',
        'Fortune favors the lucky.',
        'Have a nice day!'
    ];
    const x = Math.floor(Math.random() * fortunes.length);
    return fortunes[x];
};
```

pode ser facilmente utilizado no seu template:

```
<h1>Your fortune</h1>
<p>{{fortune}}</p>
```
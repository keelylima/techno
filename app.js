const vm = new Vue({
    el: "#app",
    data: {
        produtos: [],
        produto: false,
        carrinho: [],
        carrinhoTotal: 0,
    },
    filters: {
        numeroPreco(valor) {
            return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        }
    },
    methods: {
        fetchProdutos() {
            fetch("./api/produtos.json")
                .then(res => res.json())
                .then(res => {
                    this.produtos = res;
                })
        },
        fetchProduto(id) {
            fetch(`./api/produtos/${id}/dados.json`)
                .then(res => res.json())
                .then(res => {
                    this.produto = res;
                })
        },
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        },
        fecharModal(event) {
            if (event.target === event.currentTarget) {
                this.produto = false;
            }
        },
        adicionarItem() {
            this.produto.estoque--;
        }
    },
    created() {
        this.fetchProdutos()
    }
})
import React ,{Component} from 'react';
import api from "../../services/api";
import {Link} from 'react-router-dom';
import './styles.css';


export default class  Main extends Component {
    state ={
        products:[],
        productInfo:{},
        page:1,
    };


    //método executado assim que o componente for mostrado em tela
    componentDidMount(){
        this.loadProducts();
        //funcao para carregar os produtos 
    }

    // loadProducts precisa ser arrow function para acessar escopo de this
    loadProducts = async(page = 1 ) =>{
        const response = await api.get(`/products?page=${page}`);

        //rest operator

        const {docs, ...productInfo } = response.data

        this.setState({products: docs, productInfo, page})
    };
    prevPage = () =>{
        const {page, productInfo }=this.state
        if (page === 1) return;

        const pageNumber = page-1;
        this.loadProducts(pageNumber) 
    }
    nextPage = () =>{
        const {page, productInfo }=this.state
        if (page === productInfo.pages) return;

        const pageNumber = page+1;

        this.loadProducts(pageNumber);
    }

    render(){
        const{products, page, productInfo}=this.state
        return (
            <div className="product-list">
                {products.map(

                    product=>(

                    <article key={product._id}>
                        <strong >{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>acessar</Link>
                    </article>
                        
                    )
                )}
                <div className="actions">
                    <button disabled={page===1} onClick={this.prevPage}>anterior</button>
                    <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próxima</button>

                </div>
            </div>
        )
    }


}
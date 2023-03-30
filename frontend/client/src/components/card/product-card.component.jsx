import { Component } from 'react';


class ProductCard extends Component {
    render() {
        const {
            productId,
            productName,
            productOwnerName,
            developers,
            startDate,
            methodology
        } = this.props.product
        console.log(this.props.product)
        return (
            <div className='card-container' key={productId}>
                <h2>{productName}</h2>
                <p>{productId}</p>
                <h2>{productOwnerName}</h2>
                <p>{startDate}</p>
                <p>{methodology}</p>
                {developers.map((developer) => {
                    return <p key={`${productId}${developer}`}>{developer}</p>
                })}
            </div>
        )
    }
}

export default ProductCard;
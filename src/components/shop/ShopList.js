import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopList.css';
import NavigationBar from '../../structure/NavigationBar';
  // 네이게이션 바 컴포넌트 추가

const products = [
    { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150' },
    // 더 많은 제품 추가 가능
];

const ITEMS_PER_PAGE = 20; // 페이지당 표시할 제품 수

const ShopList = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = React.useState(1);
    const [paginatedProducts, setPaginatedProducts] = React.useState([]);

    React.useEffect(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        setPaginatedProducts(products.slice(startIndex, endIndex));
    }, [currentPage]);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const handleProductClick = (id) => {
        navigate(`/shop/shopproduct/${id}`);
    };

    return (
        <div>
            <NavigationBar/>  {/* 네이게이션 바 추가 */}
            <div className="shoplist-container">
                <div className="products-list">
                    {paginatedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img src={product.image} alt={product.name} />
                            <div className="product-name">{product.name}</div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button className="go-to-cart" onClick={() => navigate('/shop/shopcart')}>
                    장바구니 가기
                </button>
            </div>
        </div>
    );
};

export default ShopList;

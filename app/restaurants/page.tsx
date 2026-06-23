"use client";

import React, { useState } from "react";

// 타입 정의
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface Restaurant {
  id: number;
  name: string;
  category: string;
  image: string;
  minOrder: number;
  menus: MenuItem[];
}

interface CartItem extends MenuItem {
  restaurantId: number;
  restaurantName: string;
}

export default function RestaurantsPage() {
  // 1. 맛집 데이터 배열 (가로 한 줄 포맷 유지)
  const restaurants: Restaurant[] = [
    { id: 1, name: "행복한 분식점", category: "분식", image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=500", minOrder: 12000, menus: [{id: 1, name: "매콤 떡볶이", price: 5000, description: "맛있게 매운 쌀떡볶이"}, {id: 2, name: "바삭 모듬튀김", price: 6000, description: "갓 튀겨낸 모듬 튀김 세트"}] },
    { id: 3, name: "나폴리 피자파크", category: "피자", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", minOrder: 15000, menus: [{id: 5, name: "치즈 피자", price: 18000, description: "고소한 모짜렐라 치즈 듬뿍"}] },
    { id: 4, name: "대박 짜장면", category: "중식", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500", minOrder: 11000, menus: [{id: 6, name: "정통 짜장면", price: 7000, description: "춘장의 깊은 맛"}] },
    { id: 5, name: "피렌체 파스타", category: "양식", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500", minOrder: 14000, menus: [{id: 7, name: "베이컨 크림 파스타", price: 14000, description: "꾸덕하고 고소한 크림소스 파스타"}, {id: 8, name: "치즈 오븐 리조또", price: 15000, description: "모짜렐라 치즈가 듬뿍 올라간 리조또"}] },
    { id: 6, name: "오후의 디저트 카페", category: "디저트", image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=500", minOrder: 10000, menus: [{id: 9, name: "아이스 아메리카노", price: 4500, description: "산미 없이 고소한 원두의 아메리카노"}, {id: 10, name: "딸기 생크림 조각케이크", price: 7000, description: "매일 아침 직접 만드는 수제 케이크"}] },
    { id: 7, name: "하루스시 본점", category: "일식", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500", minOrder: 15000, menus: [{id: 11, name: "모듬초밥 (12P)", price: 18000, description: "신선한 제철 생선으로 만든 초밥"}, {id: 12, name: "돈코츠 라멘", price: 10000, description: "진한 돼지사골 육수가 일품인 라멘"}] },
    { id: 8, name: "기와집 묵은지 김치찜", category: "한식", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/500px-Dolsot-bibimbap.jpg", minOrder: 13000, menus: [{id: 13, name: "돼지갈비 김치찜", price: 24000, description: "푹 익은 묵은지와 부드러운 갈비"}, {id: 14, name: "차돌박이 된장찌개", price: 9000, description: "구수하고 진한 고깃집 스타일 된장찌개"}] },
  ];

  // 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = ["전체", "분식", "피자", "중식", "양식", "디저트", "일식", "한식"];

  // 카테고리 필터링된 목록
  const filteredRestaurants = selectedCategory === "전체"
    ? restaurants
    : restaurants.filter((r) => r.category === selectedCategory);

  // 현재 담긴 가게의 최소주문금액 가져오기
  const currentCartRestaurant = cart.length > 0 
    ? restaurants.find(r => r.id === cart[0].restaurantId) 
    : null;

  // 장바구니에 담긴 총 금액 계산
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // 장바구니 담기 핸들러
  const handleAddToCart = (restaurant: Restaurant, menu: MenuItem) => {
    // 1. 타 가게 메뉴 담기 차단 검증 (유지)
    if (cart.length > 0 && cart[0].restaurantId !== restaurant.id) {
      alert(`장바구니에는 같은 가게의 메뉴만 담을 수 있습니다.\n(현재 담긴 가게: ${cart[0].restaurantName})`);
      return;
    }

    // [수정] 최소주문금액 이하라도 장바구니에는 무조건 담기게 변경
    const newItem: CartItem = {
      ...menu,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    };
    setCart([...cart, newItem]);
    alert(`${menu.name}이(가) 장바구니에 담겼습니다!`);
  };

  // 장바구니 버튼 클릭(주문하기 버튼 역할) 핸들러
  const handleOrder = () => {
    if (cart.length === 0) return;

    if (currentCartRestaurant && totalCartPrice < currentCartRestaurant.minOrder) {
      alert(`최소주문금액(${currentCartRestaurant.minOrder.toLocaleString()}원) 이상 담아주셔야 주문이 가능합니다.\n현재 부족한 금액: ${(currentCartRestaurant.minOrder - totalCartPrice).toLocaleString()}원`);
      return;
    }

    // 최소주문금액 통과 시
    alert(`🎉 주문이 정상적으로 완료되었습니다!\n총 결제금액: ${totalCartPrice.toLocaleString()}원`);
    setCart([]); // 주문 완료 후 장바구니 비우기
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-28 relative shadow-lg font-sans text-gray-800">
      {/* 상단 헤더 */}
      <header className="bg-white p-4 sticky top-0 z-10 border-b border-gray-100 flex items-center justify-between">
        {selectedRestaurant ? (
          <button 
            onClick={() => setSelectedRestaurant(null)} 
            className="text-cyan-500 font-bold flex items-center gap-1 text-sm"
          >
            ← 뒤로가기
          </button>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="font-extrabold text-base text-gray-900">우리집 주소</span>
            <span className="text-xs text-gray-500">▼</span>
          </div>
        )}
        {!selectedRestaurant && <button className="text-gray-700 text-xl">🔔</button>}
      </header>

      {/* 1. 메인 화면: 가게 리스트 뷰 */}
      {!selectedRestaurant && (
        <>
          <div className="flex overflow-x-auto whitespace-nowrap bg-white border-b border-gray-100 px-2 py-3 scrollbar-hide gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat ? "bg-cyan-400 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="p-4 flex flex-col gap-4">
            {filteredRestaurants.map((res) => (
              <div
                key={res.id}
                onClick={() => setSelectedRestaurant(res)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all flex"
              >
                <img src={res.image} alt={res.name} className="w-28 h-28 object-cover flex-shrink-0" />
                <div className="p-3 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-md font-bold">{res.category}</span>
                      <h2 className="font-bold text-base text-gray-900">{res.name}</h2>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">대표 메뉴: {res.menus[0]?.name}</p>
                  </div>
                  <div className="text-xs font-semibold text-gray-700 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                    최소주문: <span className="text-red-500">{res.minOrder.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 2. 상세 화면: 가게 내부 메뉴판 뷰 */}
      {selectedRestaurant && (
        <div className="animate-fadeIn">
          <div className="relative h-48 bg-gray-200">
            <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h2 className="absolute bottom-4 left-4 text-white text-2xl font-black">{selectedRestaurant.name}</h2>
          </div>

          <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center text-sm font-bold shadow-sm">
            <span className="text-gray-500">최소주문금액</span>
            <span className="text-red-500 bg-red-50 px-2 py-1 rounded">{selectedRestaurant.minOrder.toLocaleString()}원</span>
          </div>

          <div className="p-4 flex flex-col gap-3">
            <h3 className="font-black text-gray-900 mb-1 text-sm flex items-center gap-1">📋 메뉴 전체보기</h3>
            {selectedRestaurant.menus.map((menu) => (
              <div key={menu.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <h4 className="font-bold text-gray-900 text-base">{menu.name}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{menu.description}</p>
                  <p className="text-sm font-extrabold text-cyan-600 mt-2">{menu.price.toLocaleString()}원</p>
                </div>
                <button
                  onClick={() => handleAddToCart(selectedRestaurant, menu)}
                  className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  담기
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. 하단 고정 배민 스타일 장바구니/주문하기 바 */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0,05)]">
          <div className="flex justify-between items-center mb-2 px-1 text-xs font-semibold">
            <span className="text-gray-500">배달 가게: {cart[0].restaurantName}</span>
            {currentCartRestaurant && totalCartPrice < currentCartRestaurant.minOrder ? (
              <span className="text-red-500 font-bold">
                최소주문까지 {(currentCartRestaurant.minOrder - totalCartPrice).toLocaleString()}원 부족
              </span>
            ) : (
              <span className="text-green-600 font-bold">✓ 최소주문금액 달성!</span>
            )}
          </div>
          
          <button 
            onClick={handleOrder}
            className={`w-full py-3.5 rounded-xl font-black text-base shadow-md flex items-center justify-between px-5 transition-all ${
              currentCartRestaurant && totalCartPrice < currentCartRestaurant.minOrder
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            <span className="bg-black/10 px-2 py-0.5 rounded-lg text-xs">{cart.length}</span>
            <span>{currentCartRestaurant && totalCartPrice < currentCartRestaurant.minOrder ? "최소금액 더 채우기" : "주문하기"}</span>
            <span className="font-extrabold">{totalCartPrice.toLocaleString()}원</span>
          </button>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Sheet } from 'tamagui';
import { useCartStore } from '@store/cartStore';
import SuccessDialog from './cart/SuccessDialog';
import CartHeader from './cart/CartHeader';
import CartContent from './cart/CartContent';
import CartFooter from './cart/CartFooter';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
const CartSheet = ({ isOpen, onClose }: CartSheetProps) => {
  const {
    items,
    getTotalItems,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({ items: 0, total: 0 });

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // 結帳
  const handleCheckout = () => {
    setCheckoutInfo({
      items: totalItems,
      total: totalPrice,
    });

    // 關閉 Sheet
    onClose();

    // 顯示 Dialog
    setTimeout(() => {
      setShowSuccessDialog(true);

      // 關閉 Dialog
      setTimeout(() => {
        setShowSuccessDialog(false);
        clearCart();
      }, 3000);
    }, 300);
  };

  return (
    <>
      <Sheet
        modal
        open={isOpen}
        disableDrag
        onOpenChange={(open: boolean) => !open && onClose()}
        snapPoints={[85, 50]}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
          backgroundColor="rgba(0,0,0,0.5)"
        />

        <Sheet.Handle backgroundColor="$gray6" />

        <Sheet.Frame padding="$0" backgroundColor="#F5F5F5">
          {/* Header */}
          <CartHeader totalItems={totalItems} onClose={onClose} />

          {/* Content */}
          <CartContent
            data={items}
            increaseQuantity={increaseQuantity}
            removeItem={removeItem}
            decreaseQuantity={decreaseQuantity}
          />

          {/* Footer */}
          <CartFooter
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        </Sheet.Frame>
      </Sheet>

      {/* 結帳成功 Dialog */}
      <SuccessDialog
        showSuccessDialog={showSuccessDialog}
        checkoutInfo={checkoutInfo}
      />
    </>
  );
};

export default CartSheet;

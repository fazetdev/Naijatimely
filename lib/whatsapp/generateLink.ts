interface WhatsAppParams {
  phoneNumber: string;
  message: string;
}

export function generateWhatsAppLink({ phoneNumber, message }: WhatsAppParams): string {
  // Remove any non-digit characters from phone
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Add Nigeria country code if missing (234)
  let finalPhone = cleanPhone;
  if (cleanPhone.startsWith('0')) {
    finalPhone = '234' + cleanPhone.slice(1);
  } else if (cleanPhone.length === 10) {
    finalPhone = '234' + cleanPhone;
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${finalPhone}?text=${encodedMessage}`;
}

export function generateBusinessNotification(
  businessName: string,
  customerName: string,
  serviceName: string,
  bookingTime: string,
  customerPhone: string
): string {
  const date = new Date(bookingTime);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = date.toLocaleDateString();
  
  return `🔔 New Booking Alert!

Customer: ${customerName}
Service: ${serviceName}
Date: ${formattedDate}
Time: ${formattedTime}

Customer Phone: ${customerPhone}

Click below to confirm with customer:
`;
}

export function generateCustomerConfirmation(
  businessName: string,
  serviceName: string,
  bookingTime: string,
  businessWhatsapp: string
): string {
  const date = new Date(bookingTime);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = date.toLocaleDateString();
  
  return `✅ Booking Confirmed!

Business: ${businessName}
Service: ${serviceName}
Date: ${formattedDate}
Time: ${formattedTime}

We look forward to serving you!

Save our number for future bookings:
`;
}

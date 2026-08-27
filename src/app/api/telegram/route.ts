/**
 * Telegram Bot Webhook
 * Handles incoming messages from Telegram bot @bitanoor_elec_bot
 */

import { NextRequest, NextResponse } from "next/server";
import { TelegramUpdate } from "@/types";
import { demoAccounts } from "@/data/accounts";
import { allSellers } from "@/data/sellers";
import { products, getFeaturedProducts, getNewProducts } from "@/data/catalog";

// Telegram bot token from environment
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

// Bot commands
const commands = [
  { command: "start", description: "شروع و راهنمای سریع" },
  { command: "help", description: "راهنمای کامل" },
  { command: "map", description: "نقشه فروشندگان ایران و جهانی" },
  { command: "catalog", description: "کاتالوگ محصولات" },
  { command: "leads", description: "بانک لید" },
  { command: "rag", description: "RAG آنالیز کاتالوگ" },
  { command: "hti", description: "مدل HTI Snap" },
  { command: "contact", description: "تماس با ما" },
  { command: "register", description: "ثبت‌نام" },
  { command: "users", description: "لیست کاربران" },
  { command: "clinic", description: "راهنمای کلینیک" },
];

// Format text for Telegram (HTML escaped, clipped)
function formatText(text: string, maxLength: number = 4000): string {
  // Escape HTML special characters
  let formatted = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  
  // Clip to max length
  if (formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength - 3) + "...";
  }
  
  return formatted;
}

// Create inline keyboard
function createInlineKeyboard(buttons: Array<{ text: string; callback_data?: string; url?: string }>) {
  const keyboard = [];
  for (let i = 0; i < buttons.length; i += 2) {
    const row = [];
    if (i < buttons.length) {
      row.push(buttons[i]);
    }
    if (i + 1 < buttons.length) {
      row.push(buttons[i + 1]);
    }
    if (row.length > 0) {
      keyboard.push(row);
    }
  }
  return JSON.stringify({ inline_keyboard: keyboard });
}

// Send message to Telegram
async function sendTelegramMessage(chatId: number | string, text: string, replyMarkup?: string, parseMode: string = "HTML") {
  if (!TELEGRAM_TOKEN) {
    console.error("TELEGRAM_BOT_TOKEN is not set");
    return null;
  }
  
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: formatText(text),
    parse_mode: parseMode,
    disable_web_page_preview: true,
  };
  
  if (replyMarkup) {
    (payload as any).reply_markup = replyMarkup;
  }
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return null;
  }
}

// Handle GET request (webhook setup)
export async function GET(request: NextRequest) {
  try {
    const mode = request.nextUrl.searchParams.get("mode");
    
    if (mode === "setWebhook") {
      // Set webhook
      const webhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://bitanoor-electric.pages.dev"}/api/telegram`;
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook`;
      
      const payload = {
        url: webhookUrl,
        secret_token: TELEGRAM_WEBHOOK_SECRET,
        allowed_updates: ["message", "callback_query"],
      };
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      return NextResponse.json({ success: true, data });
    }
    
    if (mode === "deleteWebhook") {
      // Delete webhook
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/deleteWebhook`;
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();
      return NextResponse.json({ success: true, data });
    }
    
    if (mode === "getWebhookInfo") {
      // Get webhook info
      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getWebhookInfo`;
      const response = await fetch(url);
      const data = await response.json();
      return NextResponse.json({ success: true, data });
    }
    
    // Set bot commands
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setMyCommands`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commands }),
    });
    
    const data = await response.json();
    return NextResponse.json({ success: true, commands, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to setup webhook", message: String(error) },
      { status: 500 }
    );
  }
}

// Handle POST request (incoming webhook)
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret if configured
    const secret = request.headers.get("x-telegram-bot-api-secret-token");
    if (TELEGRAM_WEBHOOK_SECRET && secret !== TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json(
        { success: false, error: "Invalid secret token" },
        { status: 403 }
      );
    }
    
    const body: TelegramUpdate = await request.json();
    
    // Handle message
    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text || "";
      const from = body.message.from;
      
      // Extract command
      const commandMatch = text.match(/^\/(\w+)/);
      const command = commandMatch ? commandMatch[1].toLowerCase() : "";
      
      // Handle /start command
      if (command === "start" || text === "/start") {
        const welcomeText = `
🌟 **به ربات بیتانور الکتریک خوش آمدید!** 🌟

ما بزرگترین مجموعه از تولیدکنندگان و تامین‌کنندگان چراغ‌های برقی را در اینجا گردآوری کرده‌ایم.

📌 **ماژول‌های سامانه:**
• 🗺 **نقشه فروشندگان** - ۵۰+ شرکت ایرانی + ۱۰۰ شرکت بین‌المللی
• 📄 **کاتالوگ محصولات** - ۵۰۰+ محصول نورپردازی
• 🤖 **RAG آنالیز** - آنالیز سمانتیک کاتالوگ‌ها
• ⚡ **HTI Snap** - مدل صنعتی
• 📨 **مرکز پیام‌رسانی** - تلگرام و بله

💡 **برای شروع، یکی از دستورات زیر را ارسال کنید:**
`;
        
        const buttons = [
          { text: "🗺 نقشه فروشندگان", callback_data: "cmd_map" },
          { text: "📄 کاتالوگ محصولات", callback_data: "cmd_catalog" },
          { text: "🤖 RAG آنالیز", callback_data: "cmd_rag" },
          { text: "⚡ HTI Snap", callback_data: "cmd_hti" },
          { text: "📝 ثبت‌نام", callback_data: "cmd_register" },
          { text: "📞 تماس", callback_data: "cmd_contact" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, welcomeText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle /help command
      if (command === "help" || text === "/help") {
        const helpText = `
📖 **راهنمای ربات بیتانور الکتریک**

**دستورات موجود:**

🗺 **نقشه و فروشندگان:**
• /map - مشاهده نقشه فروشندگان
• /sellers - لیست فروشندگان

📄 **کاتالوگ محصولات:**
• /catalog - کاتالوگ کامل
• /products - لیست محصولات

🤖 **آنالیز هوشمند:**
• /rag - آنالیز RAG کاتالوگ
• /hti - مدل HTI Snap

👤 **حساب کاربری:**
• /register - ثبت‌نام
• /login - ورود
• /profile - پروفایل

📞 **تماس:**
• /contact - تماس با ما
• /help - راهنما

💡 **برای استفاده از منوها، روی دکمه‌های زیر کلیک کنید.**
`;
        
        const buttons = [
          { text: "🗺 نقشه", callback_data: "cmd_map" },
          { text: "📄 کاتالوگ", callback_data: "cmd_catalog" },
          { text: "🤖 RAG", callback_data: "cmd_rag" },
          { text: "⚡ HTI", callback_data: "cmd_hti" },
          { text: "📝 ثبت‌نام", callback_data: "cmd_register" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, helpText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle /map command
      if (command === "map" || text === "/map") {
        const topSellers = allSellers
          .filter((s) => s.isFeatured)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10);
        
        let mapText = `🗺 **نقشه فروشندگان چراغ‌های برقی**\n\n`;
        mapText += `📌 **۱۰ شرکت برتر:**\n\n`;
        
        topSellers.forEach((seller, index) => {
          mapText += `${index + 1}. **${seller.name}** (${seller.location.city})\n`;
          mapText += `   ⭐ ${seller.rating}/5 | 📞 ${seller.contact.phone}\n`;
          mapText += `   💰 قیمت/لومن: ${seller.samplePricePerLumen.toLocaleString()} IRR\n\n`;
        });
        
        mapText += `🌐 **برای مشاهده نقشه تعاملی، به سایت مراجعه کنید:**\n`;
        mapText += `${process.env.NEXT_PUBLIC_SITE_URL || "https://bitanoor-electric.pages.dev"}/map`;
        
        const buttons = [
          { text: "🌍 ایران", callback_data: "map_iran" },
          { text: "🌎 جهانی", callback_data: "map_world" },
          { text: "📋 لیست کامل", callback_data: "cmd_sellers" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, mapText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle /catalog command
      if (command === "catalog" || text === "/catalog") {
        const featuredProducts = getFeaturedProducts(10);
        const newProducts = getNewProducts(5);
        
        let catalogText = `📄 **کاتالوگ محصولات بیتانور الکتریک**\n\n`;
        catalogText += `⭐ **محصولات ویژه:**\n\n`;
        
        featuredProducts.forEach((product, index) => {
          catalogText += `${index + 1}. **${product.name}**\n`;
          catalogText += `   💰 قیمت: ${product.price.toLocaleString()} ${product.currency}\n`;
          catalogText += `   ⭐ ${product.rating}/5 | 📦 موجودی: ${product.stock}\n\n`;
        });
        
        catalogText += `🆕 **محصولات جدید:**\n\n`;
        newProducts.forEach((product, index) => {
          catalogText += `${index + 1}. **${product.name}** - ${product.price.toLocaleString()} ${product.currency}\n`;
        });
        
        catalogText += `\n🌐 **برای مشاهده کاتالوگ کامل، به سایت مراجعه کنید:**\n`;
        catalogText += `${process.env.NEXT_PUBLIC_SITE_URL || "https://bitanoor-electric.pages.dev"}/catalog`;
        
        const buttons = [
          { text: "⭐ ویژه", callback_data: "catalog_featured" },
          { text: "🆕 جدید", callback_data: "catalog_new" },
          { text: "📦 همه", callback_data: "catalog_all" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, catalogText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle /leads command
      if (command === "leads" || text === "/leads") {
        const leadsText = `
📊 **بانک لید بیتانور الکتریک**

🎯 **آمار لیدها:**
• لیدهای P1: ۱۵ شرکت
• لیدهای P2: ۲۵ شرکت  
• لیدهای P3: ۱۰ شرکت

💰 **صرفه‌جویی عمده:**
• میانگین: ۱۸%
• حداکثر: ۳۵%

📈 **برای مشاهده جزئیات، به سایت مراجعه کنید:**
${process.env.NEXT_PUBLIC_SITE_URL || "https://bitanoor-electric.pages.dev"}/dashboard
`;
        
        const buttons = [
          { text: "📊 آمار", callback_data: "leads_stats" },
          { text: "🎯 لیدهای P1", callback_data: "leads_p1" },
          { text: "📞 تماس", callback_data: "cmd_contact" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, leadsText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle /register command
      if (command === "register" || text === "/register") {
        const registerText = `
📝 **ثبت‌نام در سامانه بیتانور الکتریک**

برای ثبت‌نام، شماره موبایل خود را ارسال کنید.

📌 **حساب‌های دمو برای تست:**
• ادمین: 09120000001
• فروشنده: 09123333333
• خریدار: 09121111111
• مشتری: 09125555555
• بازاریاب: 09128888888

🔑 **رمز همه حساب‌های دمو:** demo123

یا شماره موبایل خود را ارسال کنید.
`;
        
        await sendTelegramMessage(chatId, registerText);
        return NextResponse.json({ success: true });
      }
      
      // Handle /contact command
      if (command === "contact" || text === "/contact") {
        const contactText = `
📞 **تماس با بیتانور الکتریک**

📱 **تلفن:** ۰۲۱-۱۲۳۴۵۶۷۸
📧 **ایمیل:** info@bitanoor.com
🌐 **وبسایت:** https://bitanoor.com
📍 **آدرس:** تهران، خیابان کارگر شمالی، پلاک ۱۲۳

🤖 **ربات تلگرام:** @bitanoor_elec_bot

💬 **برای ارسال پیام، یکی از گزینه‌ها را انتخاب کنید:**
`;
        
        const buttons = [
          { text: "📧 ارسال ایمیل", callback_data: "contact_email" },
          { text: "📞 تماس تلفنی", callback_data: "contact_call" },
          { text: "💬 چت با کارشناس", callback_data: "contact_chat" },
        ];
        
        const replyMarkup = createInlineKeyboard(buttons);
        await sendTelegramMessage(chatId, contactText, replyMarkup);
        return NextResponse.json({ success: true });
      }
      
      // Handle unknown command or text
      if (command) {
        await sendTelegramMessage(
          chatId,
          `❌ **دستور ناشناخته**\n\nبرای لیست دستورات، /help بزنید.`
        );
        return NextResponse.json({ success: true });
      }
      
      // Handle phone number registration
      if (text && !command && /^09\d{9}$/.test(text)) {
        // Check if phone exists in demo accounts
        const user = demoAccounts.find((u) => u.phone === text);
        
        if (user) {
          const successText = `
✅ **ثبت‌نام موفق!**

شما با شماره ${text} وارد شدید.

👤 **نقش:** ${user.name}
📌 **برای شروع، یکی از دستورات را انتخاب کنید:**
`;
          
          const buttons = [
            { text: "🗺 نقشه", callback_data: "cmd_map" },
            { text: "📄 کاتالوگ", callback_data: "cmd_catalog" },
            { text: "🤖 RAG", callback_data: "cmd_rag" },
          ];
          
          const replyMarkup = createInlineKeyboard(buttons);
          await sendTelegramMessage(chatId, successText, replyMarkup);
          return NextResponse.json({ success: true });
        } else {
          await sendTelegramMessage(
            chatId,
            `⚠️ **شماره یافت نشد**\n\nبرای تست، از شماره‌های دمو استفاده کنید:\n09120000001, 09123333333, 09121111111, 09125555555, 09128888888\n\nیا در سایت ثبت‌نام کنید: ${process.env.NEXT_PUBLIC_SITE_URL || "https://bitanoor-electric.pages.dev"}/register`
          );
          return NextResponse.json({ success: true });
        }
      }
      
      // Default response
      await sendTelegramMessage(
        chatId,
        `🤖 **ربات بیتانور الکتریک**\n\nبرای شروع، /start بزنید.`
      );
      return NextResponse.json({ success: true });
    }
    
    // Handle callback query
    if (body.callback_query) {
      const chatId = body.callback_query.from.id;
      const data = body.callback_query.data || "";
      const message = body.callback_query.message;
      
      // Acknowledge callback
      const acknowledgeUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/answerCallbackQuery`;
      await fetch(acknowledgeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callback_query_id: body.callback_query.id,
          text: "✅",
          show_alert: false,
        }),
      });
      
      // Handle different callback types
      switch (data) {
        case "cmd_map":
          await sendTelegramMessage(chatId, "/map");
          break;
        case "cmd_catalog":
          await sendTelegramMessage(chatId, "/catalog");
          break;
        case "cmd_rag":
          await sendTelegramMessage(chatId, "/rag");
          break;
        case "cmd_hti":
          await sendTelegramMessage(chatId, "/hti");
          break;
        case "cmd_register":
          await sendTelegramMessage(chatId, "/register");
          break;
        case "cmd_contact":
          await sendTelegramMessage(chatId, "/contact");
          break;
        case "cmd_sellers":
          await sendTelegramMessage(chatId, "/sellers");
          break;
        case "map_iran":
          const iranSellers = allSellers.filter((s) => s.country === "ایران");
          let iranText = `🇮🇷 **فروشندگان ایرانی**\n\n`;
          iranSellers.slice(0, 10).forEach((seller, index) => {
            iranText += `${index + 1}. **${seller.name}** (${seller.location.city})\n`;
          });
          await sendTelegramMessage(chatId, iranText);
          break;
        case "map_world":
          const worldSellers = allSellers.filter((s) => s.country !== "ایران");
          let worldText = `🌍 **فروشندگان بین‌المللی**\n\n`;
          worldSellers.slice(0, 10).forEach((seller, index) => {
            worldText += `${index + 1}. **${seller.name}** (${seller.country})\n`;
          });
          await sendTelegramMessage(chatId, worldText);
          break;
        case "catalog_featured":
          const featured = getFeaturedProducts(10);
          let featuredText = `⭐ **محصولات ویژه**\n\n`;
          featured.forEach((product, index) => {
            featuredText += `${index + 1}. **${product.name}** - ${product.price.toLocaleString()} ${product.currency}\n`;
          });
          await sendTelegramMessage(chatId, featuredText);
          break;
        case "catalog_new":
          const newProducts = getNewProducts(10);
          let newText = `🆕 **محصولات جدید**\n\n`;
          newProducts.forEach((product, index) => {
            newText += `${index + 1}. **${product.name}** - ${product.price.toLocaleString()} ${product.currency}\n`;
          });
          await sendTelegramMessage(chatId, newText);
          break;
        case "catalog_all":
          await sendTelegramMessage(chatId, "/catalog");
          break;
        case "leads_stats":
          await sendTelegramMessage(chatId, "/leads");
          break;
        case "leads_p1":
          const p1Sellers = allSellers.filter((s) => s.leadPriority === "P1");
          let p1Text = `🎯 **لیدهای P1**\n\n`;
          p1Sellers.forEach((seller, index) => {
            p1Text += `${index + 1}. **${seller.name}**\n`;
          });
          await sendTelegramMessage(chatId, p1Text);
          break;
        default:
          await sendTelegramMessage(chatId, "🤖 دستور ناشناخته");
      }
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, error: "No message or callback" });
  } catch (error) {
    console.error("Telegram webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Webhook error", message: String(error) },
      { status: 500 }
    );
  }
}

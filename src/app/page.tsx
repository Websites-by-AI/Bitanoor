"use client";

import Link from "next/link";
import { LayoutDashboard, Map, Catalog, MessageSquare, Users, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ب</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">بیتانور الکتریک</h1>
                <p className="text-sm text-gray-600">سامانه تولیدکنندگان چراغ‌های برقی ایران</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn btn-primary">
                ورود
              </Link>
              <Link href="/register" className="btn btn-secondary">
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              سامانه جامع نورپردازی بیتانور
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              بزرگترین مجموعه از تولیدکنندگان و تامین‌کنندگان چراغ‌های برقی در ایران.
              شامل نقشه فروشندگان، کاتالوگ محصولات و آنالیز هوشمند.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/map" className="btn btn-secondary text-lg px-8 py-3">
                <Map className="ml-2 w-5 h-5" />
                مشاهده نقشه
              </Link>
              <Link href="/catalog" className="btn btn-primary text-lg px-8 py-3">
                <Catalog className="ml-2 w-5 h-5" />
                کاتالوگ محصولات
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">ماژول‌های سامانه</h2>
            <p className="text-lg text-gray-600 mt-4">
              هر ماژول پس از ورود فعال می‌شود
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Map className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">نقشه فروشندگان</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                ۵۰+ شرکت ایرانی + ۱۰۰ شرکت بین‌المللی با تحلیل هزینه و قیمت نمونه
              </p>
              <Link href="/map" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>

            {/* Catalog Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Catalog className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">کاتالوگ محصولات</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                تجمیع مشخصات چراغ‌های خانگی و صنعتی — خروجی CSV و HTML آماده چاپ
              </p>
              <Link href="/catalog" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>

            {/* RAG Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">RAG آنالیز کاتالوگ</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                پردازش سمانتیک کاتالوگ‌های PDF با ایندکس برداری
              </p>
              <Link href="/rag" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>

            {/* Messaging Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">مرکز پیام‌رسانی</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                اعلان‌ها از طریق ربات تلگرام با تأیید انسانی، Dry Run و انطباق
              </p>
              <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>

            {/* Dashboard Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">حساب کاربری</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                داشبورد نقش‌محور: ادمین، خریدار، فروشنده، مشتری و بازاریاب
              </p>
              <Link href="/login" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>

            {/* HTI Module */}
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold mr-4">HTI Snap Model</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                نمای یک‌صفحه‌ای ممیزی صنعتی، پکیج پیشنهادی و برنامه ۳۰/۶۰/۹۰ روزه
              </p>
              <Link href="/hti" className="text-blue-600 font-medium hover:text-blue-800">
                ورود ←
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">فرآیند کار</h2>
            <p className="text-lg text-gray-600 mt-4">
              از ثبت‌نام تا پیگیری در ۴ گام
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">۱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">گام ۱: ثبت‌نام</h3>
              <p className="text-gray-600 text-sm">
                با شماره موبایل در سایت یا مستقیماً داخل ربات تلگرام (/register)
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">۲</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">گام ۲: کشف شرکت‌ها</h3>
              <p className="text-gray-600 text-sm">
                جست‌وجو در ۱۵۰+ شرکت ایرانی و جهانی روی نقشه تعاملی
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">۳</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">گام ۳: تحلیل هزینه</h3>
              <p className="text-gray-600 text-sm">
                نمونه قیمت، توان، ولتاژ و درصد صرفه‌جویی عمده
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">۴</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">گام ۴: پیگیری</h3>
              <p className="text-gray-600 text-sm">
                استعلام و اعلان با تأیید انسانی — همان داده‌ها در چت
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">بیتانور الکتریک</h3>
              <p className="text-gray-400 text-sm">
                بزرگترین مجموعه از تولیدکنندگان چراغ‌های برقی در ایران
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">لینک‌های سریع</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/map" className="text-gray-400 hover:text-white text-sm">
                    نقشه فروشندگان
                  </Link>
                </li>
                <li>
                  <Link href="/catalog" className="text-gray-400 hover:text-white text-sm">
                    کاتالوگ محصولات
                  </Link>
                </li>
                <li>
                  <Link href="/rag" className="text-gray-400 hover:text-white text-sm">
                    RAG آنالیز
                  </Link>
                </li>
                <li>
                  <Link href="/hti" className="text-gray-400 hover:text-white text-sm">
                    HTI Snap Model
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">ربات‌ها</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://t.me/bitanoor_elec_bot" className="text-gray-400 hover:text-white text-sm">
                    تلگرام: @bitanoor_elec_bot
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">تماس</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:info@bitanoor.com" className="text-gray-400 hover:text-white text-sm">
                    ایمیل: info@bitanoor.com
                  </a>
                </li>
                <li>
                  <span className="text-gray-400 text-sm">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              کپی‌رایت © ۱۴۰۵ بیتانور الکتریک. تمام حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

# إعلانك AI — النشر على Netlify

## 1) احصل على مفتاح Gemini
ادخل https://aistudio.google.com/apikey واضغط Create API key وانسخ المفتاح.

## 2) انشر المشروع
- ادخل https://app.netlify.com/drop واسحب مجلد المشروع كله (e3lanak-ai) عليه.
  (لو الـ Functions مش شغالة بالسحب والإفلات، ارفع المجلد على GitHub واربطه من Add new site ← Import an existing project.)

## 3) ضع المفتاح (مكانه الوحيد)
Netlify ← موقعك ← Site configuration ← Environment variables ← Add a variable
- Key:   GEMINI_API_KEY
- Value: (المفتاح اللي نسخته)
احفظ، ثم Deploys ← Trigger deploy ← Deploy site.

## ملاحظات
- لا تضع المفتاح في أي ملف داخل المشروع.
- لتغيير الموديل أضف متغير GEMINI_MODEL (اختياري، الافتراضي gemini-2.5-flash).

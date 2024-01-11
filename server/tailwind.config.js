/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.html", "./public/js/*.js"],
  theme: {
    extend: { 
      fontFamily: {
      ChatReg: ['Chathura-Regular', 'sans-serif'],
      ChatBold: ['Chathura-Bold', 'sans-serif'],
      ChatExtraBold: ['Chathura-ExtraBold', 'sans-serif'],
      csregular: ['cs-regular', 'sans-serif'],
      Optimus: ['Optimus', 'sans-serif']
    },

    fontSize: {
      'th1' : ['20rem', { lineHeight: '1' }],
    }
    

  },
  },
  plugins: [],
}


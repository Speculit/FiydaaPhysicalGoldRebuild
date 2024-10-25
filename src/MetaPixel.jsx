import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MetaPixel = () => {
  useEffect(() => {
    // Meta Pixel script
    !function(f, b, e, v, n, t, s) {
      if (f.fbq) return; 
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e); 
      t.async = !0;
      t.src = v; 
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', '903375534461654');
    fbq('track', 'PageView');

    // Append <noscript> manually to the DOM
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=903375534461654&ev=PageView&noscript=1" />`;
    document.body.appendChild(noscript);

    // Cleanup function to remove noscript when component unmounts
    return () => {
      document.body.removeChild(noscript);
    };
  }, []);

  return (
    <Helmet>
      {/* Meta Pixel Script inside the Helmet */}
      <script>{`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '903375534461654');
        fbq('track', 'PageView');
      `}</script>
    </Helmet>
  );
};

export default MetaPixel;

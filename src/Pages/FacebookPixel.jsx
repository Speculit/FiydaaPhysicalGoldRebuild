import React, { useEffect } from "react";

const Facebook = () => {
  useEffect(() => {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );
    fbq("init", "903375534461654"); // Insert your Pixel ID here
    fbq("track", "PageView");

    const productIds = [
      "AU920MBR50S",
      "AB916G09P05CM",
      "AB916G09P05CB",
      "AG916GB08S",
      "AG916CB04S",
      "AG916BE10S",
      "AG916BB20S",
      "AU999GC001G",
      "AU999GC005G",
      "AU999GC01G",
      "AU999GC02G",
      "AU999GC08G",
      "AU999GC10G",
      "AU999G010LGSLC",
      "AU999GC20G",
      "AU999GC50G",
      "AU999GC05G"
    ];

    fbq("track", "ViewContent", {
      content_ids: productIds, // Send all product IDs at once
      content_type: "product",
    });
  }, []);

  return null;
};

export default Facebook;
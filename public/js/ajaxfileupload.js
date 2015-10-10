/*! Ajax File Upload Plugin - v1.0.0 - 2013-05-01
 * https://github.com/jchild3rs/AjaxFileUpload
 * Copyright (c) 2013 James Childers; Licensed MIT */
(function () {
    var e, t = function (e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    };
    e = function () {
        function g(e, n) {
            var i = this;
            this.input = e, this.upload = t(this.upload, this), this.reset = t(this.reset, this), this.settings = p.merge(r, n);
            if (this.input.multiple || this.settings.multiple)this.input.multiple = !0, this.settings.multiple = !0;
            this.settings.allowedTypes.length > 0 && p.attr(this.input, {accept: this.settings.allowedTypes.join()}), this.settings.url === "" && (this.settings.url = this.input.getAttribute("data-url")), this.settings.url === "" && this.input.form.action !== "" && (this.settings.url = this.input.form.action);
            if (this.settings.url === "")return;
            this.settings.additionalData !== {} && (this.settings.url += "?" + p.serialize(this.settings.additionalData)), this.settings.showCustomInput && h(this), c.fileAPI && c.formData ? this.input.addEventListener("change", function (e) {
                return l(e, i)
            }) : s(this), window.AjaxFileUpload = window.AjaxFileUpload || g, window.AjaxFileUpload.instances = g.instances || [], window.AjaxFileUpload.instances[this.input.id] = this;
            return
        }

        var e, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m = this;
        return r = {
            url: "",
            additionalData: {},
            autoUpload: !1,
            dataType: "json",
            method: "post",
            pathToSwf: "/dist/AjaxFileUpload.swf",
            showCustomInput: !1,
            buttonEmptyText: "Select",
            buttonSelectedText: "Upload",
            showProgressBar: !1,
            progressBarElement: "",
            debug: !1,
            multiple: !1,
            sizeLimit: 0,
            allowedTypes: [],
            onSuccess: function () {
            },
            onError: function () {
            },
            onFileSelect: function () {
            },
            onProgress: function () {
            },
            onProgressStart: function () {
            },
            onProgressEnd: function () {
            }
        }, g.prototype.reset = function () {
            var e, t;
            e = document.getElementById("fu-button-" + this.input.id), e != null && (e.innerHTML = this.settings.buttonEmptyText), t = document.getElementById("fu-input-" + this.input.id), t != null && (t.value = ""), this.input.value = "", p.css(this.input, {display: "block"})
        }, g.prototype.upload = function () {
            return e(this)
        }, l = function (t, n) {
            var r, s, o;
            o = n.settings, v(n) && (o.autoUpload && n.upload(), o.onFileSelect.apply(o, [t.target.files]), o.showCustomInput && (r = document.getElementById("fu-button-" + t.target.id), s = document.getElementById("fu-input-" + t.target.id), r.innerHTML = o.buttonSelectedText, p.css(n.input, {display: "none"}), r.onclick = function () {
                return e(n), !1
            }, i(s, t.target.files)))
        }, e = function (e) {
            var t, n, r, i, s, l;
            if (e.input.files.length === 0)return;
            r = new XMLHttpRequest, r.upload ? (r.upload.addEventListener("progress", function (t) {
                return o(t, e)
            }), r.upload.addEventListener("loadstart", function (t) {
                return a(t, e)
            }), r.upload.addEventListener("load", function (t) {
                return u(t, e)
            })) : r.addEventListener("progress", function (t) {
                return o(t, e)
            }), r.addEventListener("readystatechange", function (t) {
                return f(t, e)
            }), n = new FormData, l = e.input.files;
            for (i = 0, s = l.length; i < s; i++)t = l[i], n.append(t.name, t);
            r.open(e.settings.method, e.settings.url, !0);
            switch (e.settings.dataType) {
                case"json":
                    r.setRequestHeader("Accept", "application/json");
                    break;
                case"xml":
                    r.setRequestHeader("Accept", "text/xml");
                    break;
                default:
            }
            r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.send(n)
        }, f = function (e, t) {
            var n, r, i, s;
            r = e.target;
            if (r.readyState !== 4)return;
            n = r.responseText, ~r.getResponseHeader("content-type").indexOf("application/json") && !!window.JSON && (n = JSON.parse(n)), r.status === 200 || r.status === 201 ? ((i = t.settings).onSuccess.apply(i, [n, t.input.files, r]), t.reset()) : (s = t.settings).onError.apply(s, [n, t.input.files, r])
        }, a = function (e, t) {
            var n;
            return t.settings.showCustomInput && (document.getElementById("fu-wrap-" + t.input.id).className += " fu-loading"), (n = t.settings).onProgressStart.apply(n, [t.input.files, e.target])
        }, o = function (e, t) {
            var n;
            return (n = t.settings).onProgress.apply(n, [e.loaded, e.total, t.input.files, e.target])
        }, u = function (e, t) {
            var n, r;
            return t.settings.showCustomInput && (n = document.getElementById("fu-wrap-" + t.input.id), n.className = n.className.replace(" fu-loading", "")), (r = t.settings).onProgressEnd.apply(r, [t.input.files, e.target])
        }, s = function (e) {
            var t, r, i, s, o, u, a, f, l, c, h;
            s = "fu-embed-" + e.input.id;
            if (document.getElementById(s !== null))return;
            t = e.settings.allowedTypes, t = t.join(";").replace(/[a-z]*\//ig, "*."), o = {
                id: e.input.id,
                url: e.settings.url,
                method: e.settings.method,
                debug: e.settings.debug,
                multiple: e.settings.multiple,
                additionalData: e.settings.additionalData,
                sizeLimit: e.settings.sizeLimit,
                allowedTypes: t
            }, f = {
                movie: e.settings.pathToSwf,
                quality: "low",
                play: "true",
                loop: "true",
                wmode: "transparent",
                scale: "noscale",
                menu: "true",
                devicefont: "false",
                salign: "",
                allowScriptAccess: "sameDomain",
                flashvars: p.serialize(o)
            }, r = {
                src: e.settings.pathToSwf,
                id: s,
                name: "fu-embed-" + e.input.id,
                classid: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                type: "application/x-shockwave-flash",
                pluginspage: "http://www.adobe.com/go/getflashplayer",
                FlashVars: p.serialize(o),
                width: e.input.offsetWidth + 5,
                height: e.input.offsetHeight + 5
            }, i = document.getElementById(s), i || (i = document.createElement("embed")), h = document.getElementById("fu-wrap-" + e.input.id), n(i, h);
            for (u in f)c = f[u], f.hasOwnProperty(u) && (a = document.createElement("param"), p.attr(a, {
                name: u,
                value: c
            }));
            p.attr(i, p.merge(r, f)), p.css(i, {
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                cursor: "pointer"
            }), e.settings.showCustomInput ? (l = document.getElementById("fu-button-" + e.input.id), l.parentNode.insertBefore(i, l.nextSibling), e.input.style.display = "none") : e.input.parentNode.insertBefore(i, e.input.nextSibling)
        }, n = function (e, t) {
            return e.onmouseover = function () {
                return p.attr(t, {"class": "fu-wrap fu-hover"})
            }, e.onmouseout = function () {
                return p.attr(t, {"class": "fu-wrap"})
            }, e.onmousedown = function () {
                return p.attr(t, {"class": "fu-wrap fu-active"})
            }, e.onmouseup = function () {
                return p.attr(t, {"class": "fu-wrap"})
            }
        }, h = function (e) {
            var t, r, i, s, o;
            return i = e.input, o = "fu-wrap-" + i.id, document.getElementById(o) !== null ? !1 : (s = document.createElement("div"), p.attr(s, {
                "class": "fu-wrap",
                id: o
            }), p.css(s, {position: "relative"}), r = document.createElement("input"), p.attr(r, {
                type: "text",
                disabled: "disabled",
                "class": "fu-input",
                id: "fu-input-" + i.id
            }), t = document.createElement("button"), p.attr(t, {
                "class": "fu-button button",
                id: "fu-button-" + i.id
            }), e.settings.autoUpload ? t.innerHTML = e.settings.buttonSelectedText : t.innerHTML = e.settings.buttonEmptyText, t.onclick = function () {
                return t.innerHTML === e.settings.buttonSelectedText && e.upload(), !1
            }, s.appendChild(r), s.appendChild(t), i.parentNode.insertBefore(s, i.nextSibling), s.appendChild(i), p.css(i, {
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0
            }), n(i, s), p.css(i, {
                width: document.getElementById(o).clientWidth + "px",
                height: document.getElementById(o).clientHeight + "px"
            }), i)
        }, i = function (e, t) {
            var n, r, i, s;
            if (t.length === 0)return;
            if (t.length === 1)return e.value = t[0].name;
            if (t.length > 1) {
                r = "";
                for (i = 0, s = t.length; i < s; i++)n = t[i], r += n.name + " ";
                return e.value = r
            }
        }, p = {
            css: function (e, t) {
                var n, r;
                for (n in t)r = t[n], e.style[n] = r
            }, attr: function (e, t) {
                var n, r;
                for (n in t)r = t[n], n === "class" ? e.className = r : t.hasOwnProperty(n) && e.setAttribute(n, r)
            }, serialize: function (e, t) {
                var n, r, i, s;
                i = [];
                for (r in e)s = e[r], n = t ? t + "[" + r + "]" : r, typeof s == "object" ? i.push(p.serialize(s, n)) : i.push(encodeURIComponent(n) + "=" + encodeURIComponent(s));
                return i.join("&")
            }, merge: function (e, t) {
                var n;
                for (n in t)try {
                    t[n].constructor === Object ? e[n] = p.merge(e[n], t[n]) : e[n] = t[n]
                } catch (r) {
                    e[n] = t[n]
                }
                return e
            }
        }, c = {
            fileAPI: !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob,
            formData: !!window.FormData,
            fileTypeFiltering: typeof document.createElement("input").accept == "string",
            progressbar: document.createElement("progress").max !== void 0
        }, d = {
            sizeLimit: function (e, t) {
                return e <= t
            }, fileType: function (e, t) {
                var n, r, i, s;
                if (t === [] || !c.fileTypeFiltering)return !0;
                n = !1;
                if (!!t)for (i = 0, s = t.length; i < s; i++)r = t[i], ~r.indexOf(e) && (n = !0);
                return n
            }
        }, v = function (e) {
            var t, n, r, i, s, o;
            n = e.input.files, i = e.settings, r = [];
            if (n.length === 0)return i.onError.apply(e, ["No file selected"]), !1;
            for (s = 0, o = n.length; s < o; s++)t = n[s], i.sizeLimit !== 0 && !d.sizeLimit(t.size, i.sizeLimit) && r.push('"' + t.name + '" is ' + t.size + " bytes. Your provided limit is " + i.sizeLimit + " bytes."), i.allowedTypes.length !== 0 && !d.fileType(t.type, i.allowedTypes) && r.push('"' + t.name.split(".")[1] + '" is not a valid file type/extension: ' + i.allowedTypes);
            return r.length > 0 && i.onError.apply(e, r), r.length === 0
        }, g
    }.call(this), window.AjaxFileUploadFlashProxy = function (e, t, n) {
        var r;
        r = window.AjaxFileUpload.instances[e], r.settings[t].apply(r, n)
    }, window.AjaxFileUpload = e, window.jQuery && (jQuery.ajaxFileUpload = e, jQuery.fn.ajaxFileUpload = function (t) {
        return this.each(function (n, r) {
            new e(r, t)
        })
    }), typeof define == "function" && define.amd && define("ajaxFileUpload", [], function () {
        return e
    })
}).call(this);
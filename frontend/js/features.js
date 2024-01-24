
/*
$('a').click(function(){
    alert("You are about to go to "+$(this).attr('href'));
});
*/

var result = {};
//---------------------- 1.  IP Address  ----------------------

var url = window.location.href;
// alert(url);
var urlDomain = window.location.hostname;

//url="0x58.0xCC.0xCA.0x62"

var patt = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]?[0-9])(\.|$){4}/;
var patt2 = /(0x([0-9][0-9]|[A-F][A-F]|[A-F][0-9]|[0-9][A-F]))(\.|$){4}/;
var ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;


if(ip.test(urlDomain)||patt.test(urlDomain)||patt2.test(urlDomain)){ 
    result["IP Address"]="1";
}else{
    result["IP Address"]="-1";
}

//alert(result);

//---------------------- 2.  URL Length  ----------------------


//alert(url.length);
if(url.length<54){
    result["URL Length"]="-1";
}else if(url.length>=54&&url.length<=75){
    result["URL Length"]="0";
}else{
    result["URL Length"]="1";
}
//alert(result);


//---------------------- 3.  Tiny URL  ----------------------

var onlyDomain = urlDomain.replace('www.','');

if(onlyDomain.length<7){
    result["Tiny URL"]="1";
}else{
    result["Tiny URL"]="-1";
}
//alert(result);

//---------------------- 4.  @ Symbol  ----------------------

patt=/@/;
if(patt.test(url)){ 
    result["@ Symbol"]="1";
}else{
    result["@ Symbol"]="-1";
}

//---------------------- 5.  Redirecting using //  ----------------------

if(url.lastIndexOf("//")>7){
    result["Redirecting using //"]="1";
}else{
    result["Redirecting using //"]="-1";
}

//---------------------- 6. (-) Prefix/Suffix in domain  ----------------------

patt=/-/;
if(patt.test(urlDomain)){ 
    result["(-) Prefix/Suffix in domain"]="1";
}else{
    result["(-) Prefix/Suffix in domain"]="-1";
}

//---------------------- 7.  No. of Sub Domains  ----------------------

//patt=".";

if((onlyDomain.match(RegExp('\\.','g'))||[]).length==1){ 
    result["No. of Sub Domains"]="-1";
}else if((onlyDomain.match(RegExp('\\.','g'))||[]).length==2){ 
    result["No. of Sub Domains"]="0";    
}else{
    result["No. of Sub Domains"]="1";
}

//---------------------- 8.  HTTPS  ----------------------


patt=/https:\/\//;
if(patt.test(url)){
    result["HTTPS"]="-1";
}else{
    result["HTTPS"]="1";
}

//---------------------- 9.  Domain Registration Length  ----------------------
// try {
//     const expirationDate = whoisResponse.expiration_date;
//     const creationDate = whoisResponse.creation_date;

//     let expirationDateValue;
//     try {
//         if (expirationDate && expirationDate.length) {
//             expirationDateValue = expirationDate[0];
//         }
//     } catch (error) {
//         // Handle the exception if needed
//     }

//     let creationDateValue;
//     try {
//         if (creationDate && creationDate.length) {
//             creationDateValue = creationDate[0];
//         }
//     } catch (error) {
//         // Handle the exception if needed
//     }

//     const today = new Date();
//     const age = (expirationDateValue.getFullYear() - creationDateValue.getFullYear()) * 12 + (expirationDateValue.getMonth() - creationDateValue.getMonth());

//     if (age >= 12) {
//         result["Domain_registeration_length"]=1;
//     }
//     result["Domain_registeration_length"]=-1;
// } catch (error) {
//     result["Domain_registeration_length"]=-1;
// }
//---------------------- 10. Favicon  ----------------------

var favicon = undefined;
var nodeList = document.getElementsByTagName("link");
for (var i = 0; i < nodeList.length; i++)
{
    if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
    {
        favicon = nodeList[i].getAttribute("href");
    }
}
if(!favicon) {
    result["Favicon"]="-1";
}else if(favicon.length==12){
    result["Favicon"]="-1";
}else{
    patt=RegExp(urlDomain,'g');
    if(patt.test(favicon)){
        result["Favicon"]="-1";
    }else{
        result["Favicon"]="1";
    }
}


//---------------------- 11. Using Non-Standard Port  ----------------------

result["Port"]="-1";

//---------------------- 12.  HTTPS in URL's domain part  ----------------------


patt=/https/;
if(patt.test(onlyDomain)){
    result["HTTPS in URL's domain part"]="1";
}else{
    result["HTTPS in URL's domain part"]="-1";
}

// alert(result);

//---------------------- 13.  Request URL  ----------------------

var imgTags = document.getElementsByTagName("img");

var phishCount=0;
var legitCount=0;

patt=RegExp(onlyDomain,'g');

for(var i = 0; i < imgTags.length; i++){
    var src = imgTags[i].getAttribute("src");
    if(!src) continue;
    if(patt.test(src)){
        legitCount++;
    }else if(src.charAt(0)=='/'&&src.charAt(1)!='/'){
        legitCount++;
    }else{
        phishCount++;
    }
}
var totalCount=phishCount+legitCount;
var outRequest=(phishCount/totalCount)*100;
//alert(outRequest);

if(outRequest<22){
    result["Request URL"]="-1";
}else if(outRequest>=22&&outRequest<61){
    result["Request URL"]="0";
}else{
    result["Request URL"]="1";
}

//---------------------- 14.  URL of Anchor  ----------------------
var aTags = document.getElementsByTagName("a");

phishCount=0;
legitCount=0;
var allhrefs="";

for(var i = 0; i < aTags.length; i++){
    var hrefs = aTags[i].getAttribute("href");
    if(!hrefs) continue;
    allhrefs+=hrefs+"       ";
    if(patt.test(hrefs)){
        legitCount++;
    }else if(hrefs.charAt(0)=='#'||(hrefs.charAt(0)=='/'&&hrefs.charAt(1)!='/')){
        legitCount++;
    }else{
        phishCount++;
    }
}
totalCount=phishCount+legitCount;
outRequest=(phishCount/totalCount)*100;

if(outRequest<31){
    result["Anchor"]="-1";
}else if(outRequest>=31&&outRequest<=67){
    result["Anchor"]="0";
}else{
    result["Anchor"]="1";
}

//alert(allhrefs);

//---------------------- 15. Links in script and link  ----------------------

var mTags = document.getElementsByTagName("meta");
var sTags = document.getElementsByTagName("script");
var lTags = document.getElementsByTagName("link");

phishCount=0;
legitCount=0;

allhrefs="sTags  ";

for(var i = 0; i < sTags.length; i++){
    var sTag = sTags[i].getAttribute("src");
    if(sTag!=null){
        allhrefs+=sTag+"      ";
        if(patt.test(sTag)){
            legitCount++;
        }else if(sTag.charAt(0)=='/'&&sTag.charAt(1)!='/'){
            legitCount++;
        }else{
            phishCount++;
        }
    }
}

allhrefs+="      lTags   ";
for(var i = 0; i < lTags.length; i++){
    var lTag = lTags[i].getAttribute("href");
    if(!lTag) continue;
    allhrefs+=lTag+"       ";
    if(patt.test(lTag)){
        legitCount++;
    }else if(lTag.charAt(0)=='/'&&lTag.charAt(1)!='/'){
        legitCount++;
    }else{
        phishCount++;
    }
}

totalCount=phishCount+legitCount;
outRequest=(phishCount/totalCount)*100;

if(outRequest<17){
    result["Script & Link"]="-1";
}else if(outRequest>=17&&outRequest<=81){
    result["Script & Link"]="0";
}else{
    result["Script & Link"]="1";
}

//alert(allhrefs);

//---------------------- 16.Server Form Handler ----------------------

var forms = document.getElementsByTagName("form");
var res = "-1";

for(var i = 0; i < forms.length; i++) {
    var action = forms[i].getAttribute("action");
    if(!action || action == "") {
        res = "1";
        break;
    } else if(!(action.charAt(0)=="/" || patt.test(action))) {
        res = "0";
    }
}
result["SFH"] = res;

//---------------------- 17.Submitting to mail ----------------------

var forms = document.getElementsByTagName("form");
var res = "-1";

for(var i = 0; i < forms.length; i++) {
    var action = forms[i].getAttribute("action");
    if(!action) continue;
    if(action.startsWith("mailto")) {
        res = "1";
        break;
    }
}
result["mailto"] = res;

//--------------- Abnormal_URL  -------------------//
try{
var responseText = this.response.text;
var whoisResponse = this.whois_response;

if (responseText === whoisResponse) {
    result["Abnormal_URL"]="1";
} else {
    result["Abnormal_URL"]="-1";
}}
catch(error){
    result["Abnormal_URL"]="-1";
}

//----------------- Redirect ----------------------//
try{
const historyLength = this.response.history.length;

        if (historyLength <= 1) {
            result["Redirect"]="1";
        } else if (historyLength <= 4) {
            result["Redirect"]="0";
        } else {
            result["Redirect"]="-1";
        }
    }
    catch(error){
        result["Redirect"]="-1";
    }

//-----------------Statusbar crust ---------------//
try{
var scripts = document.getElementsByTagName('script');
for (var i = 0; i < scripts.length; i++) {
    var scriptContent = scripts[i].textContent || scripts[i].innerText;
            if (scriptContent.includes('onmouseover')) {
                    result["on_mouseover"]="1";
                }
            }
            result["on_mouseover"]="-1";
        }
        catch(error){
            result["on_mouseover"]="-1";
        }

//----------------Disable right click ----------------//
try{
let scriptContent = this.response.text;
        const regex = /event\.button\s*==\s*2/;
        if (regex.test(scriptContent)) {
            result["RightClick"]="1";
        } else {
            result["RightClick"]="-1";
        }
    }
    catch(error){
        result["RightClick"]="-1";
    }

//--------------------popUpWidnow--------------------------//
try{
    let alertRegex = /alert\(/;
    if (alertRegex.test(this.response.text)) {
        result["popUpWidnow"]="1";
    } else {
        result["popUpWidnow"]="-1";
    }
}
catch (error) {
    result["popUpWidnow"]=-1;
}

//---------------------- 23.Using iFrame ----------------------

var iframes = document.getElementsByTagName("iframe");

if(iframes.length == 0) {
    result["iFrames"] = "-1";
} else {
    result["iFrames"] = "1";
}
 //-------------------24. age_of_domain ---------------------//
 try{
 const creation_date = this.whois_response.creation_date;
        let age = -1;

        try {
            if (creation_date.length > 0) {
                creation_date = creation_date[0];
            }
        } catch (error) {
            // Handle exception
        }

        const today = new Date();
        age = (today.getFullYear() - creation_date.getFullYear()) * 12 +
              (today.getMonth() - creation_date.getMonth());

        if (age >= 6) {
            result["AgeofDomain"]="1";
        } else {
            result["AgeofDomain"]="-1";
        }
    }
    catch(error){
        result["AgeofDomain"]="-1";
    }

//---------------------25.DNSRecord ---------------------------//
try{
const creation_date1 = this.whois_response.creation_date;
        let age1 = -1;

        try {
            if (creation_date1.length > 0) {
                creation_date1 = creation_date1[0];
            }
        } catch (error) {
            // Handle exception
        }

        const today1 = new Date();
        age = (today1.getFullYear() - creation_date1.getFullYear()) * 12 +
              (today1.getMonth() - creation_date1.getMonth());

        if (age1 >= 6) {
            result["AgeofDomain"]="1";
        } else {
                result["AgeofDomain"]="-1";
        }
    } catch(error){
        result["AgeofDomain"]="-1";
    }

//--------------------------26.web_traffic ---------------------//
// try{
// const url = this.url;
//         const response = await fetch(`http://data.alexa.com/data?cli=10&dat=s&url=${url}`);
//         const xmlData = await response.text();

//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
//         const rank = xmlDoc.querySelector('REACH').getAttribute('RANK');

//         if (parseInt(rank) < 100000) {
//             result["web_traffic"]="1";
//         } else {
//             result["web_traffic"]="0";
//         }
//     }
//     catch(error){
//         result["web_traffic"]="-1";
//     }

//-----------------27. Page_Rank -------------------//
// try{
// const response1 = await fetch("https://www.checkpagerank.net/index.php", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({ name: this.domain }),
//         });

//         const htmlData = await response1.text();
//         const match = htmlData.match(/Global Rank: ([0-9]+)/);

//         if (match) {
//             const globalRank = parseInt(match[1]);

//             if (globalRank > 0 && globalRank < 100000) {
//                 result["Page_Rank"]="1";
//             } else {
//                 result["Page_Rank"]="-1";
//             }
//         } else {
//             result["Page_Rank"]="-1";
//         }
//     }
//     catch(error){
//         result["Page_Rank"]="-1";
//     }

//----------------------28.Google_Index --------------------//
// try{
// const response2 = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(this.url)}&key=YOUR_API_KEY&cx=YOUR_CX`);
//         const searchData = await response2.json();

//         if (searchData.items && searchData.items.length > 0) {
//             result["Google_Index"]="1";
//         } else {
//             result["Google_Index"]="-1";
//         }
//     }
//     catch(error){
//         result["Google_Index"]="1";
//     }

//--------------------29. Links_pointing_to_page ------------------------//
try{
const linkElements = document.querySelectorAll('a[href]');
        const numberOfLinks = linkElements.length;

        if (numberOfLinks === 0) {
            result["LinksPointingToPage"]="1";
        } else if (numberOfLinks <= 2) {
            result["LinksPointingToPage"]="0";
        } else {
            result["LinksPointingToPage"]="-1";
        }
    }
    catch (error) {
        result["LinksPointingToPage"]="-1";
    }

//-----------------------30. Statistical_report ------------------------//
// try {
//     const urlPattern = /at\.ua|usa\.cc|baltazarpresentes\.com\.br|pe\.hu|esy\.es|hol\.es|sweddy\.com|myjino\.ru|96\.lt|ow\.ly/;
//     const ipPattern = /146\.112\.61\.108|213\.174\.157\.151|121\.50\.168\.88|192\.185\.217\.116|78\.46\.211\.158|181\.174\.165\.13|46\.242\.145\.103|121\.50\.168\.40|83\.125\.22\.219|46\.242\.145\.98|107\.151\.148\.44|107\.151\.148\.107|64\.70\.19\.203|199\.184\.144\.27|107\.151\.148\.108|107\.151\.148\.109|119\.28\.52\.61|54\.83\.43\.69|52\.69\.166\.231|216\.58\.192\.225|118\.184\.25\.86|67\.208\.74\.71|23\.253\.126\.58|104\.239\.157\.210|175\.126\.123\.219|141\.8\.224\.221|10\.10\.10\.10|43\.229\.108\.32|103\.232\.215\.140|69\.172\.201\.153|216\.218\.185\.162|54\.225\.104\.146|103\.243\.24\.98|199\.59\.243\.120|31\.170\.160\.61|213\.19\.128\.77|62\.113\.226\.131|208\.100\.26\.234|195\.16\.127\.102|195\.16\.127\.157|34\.196\.13\.28|103\.224\.212\.222|172\.217\.4\.225|54\.72\.9\.51|192\.64\.147\.141|198\.200\.56\.183|23\.253\.164\.103|52\.48\.191\.26|52\.214\.197\.72|87\.98\.255\.18|209\.99\.17\.27|216\.38\.62\.18|104\.130\.124\.96|47\.89\.58\.141|78\.46\.211\.158|54\.86\.225\.156|54\.82\.156\.19|37\.157\.192\.102|204\.11\.56\.48|110\.34\.231\.42/;
    
//     const urlMatch = url.match(urlPattern);

//     const ipAddress = await new Promise(resolve => {
//         const xhr = new XMLHttpRequest();
//         xhr.onload = function () {
//             resolve(xhr.responseText);
//         };
//         xhr.open('GET', 'https://api64.ipify.org?format=json', true);
//         xhr.send();
//     });

//     const ipMatch = ipAddress.match(ipPattern);

//     if (urlMatch || ipMatch) {
//         result["Statistical_report"]=-1;
//     } else {
//         result["Statistical_report"]=1;
//     }
// } catch (error) {
//     result["Statistical_report"]=1;
// }
//---------------------- Sending the result  ----------------------//

chrome.runtime.sendMessage(result, function(response) {
    console.log(result);
    //console.log(response);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'redirect') {
            // Perform the redirect
            window.location.href = request.redirectUrl;
          }
      if (request.action == "alert_user")
        alert("Warning!!! This seems to be a phishing website.");
      return Promise.resolve("Dummy response to keep the console quiet");
    });

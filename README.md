# bcore.yunpian

bcore微服务--云片网通讯服务

## Options

* `apikey`: [`String`] 云片网控制台对应的用户唯一标识 **Required**
* `tpls`:[`Object`] 发送信息的模板映射,且内部定义的模板必须是云片网已经报备审核过的短信模板 **Required**
  * `id`: [`String`] 短信模板id **Required**
  * `params`: [`Array`] 短信模板内的参数名称列表 **Required**
  * `content`: [`String`] 短信模板内容(已被云片网审核报备) **Optional**
  ```json
  {
    "tpls":{
        "id":"短信模板id",
        "params":["company","code"],
        "content": "【#company#】您的验证码:#code#"
    }
  }
  ```

## API

### sendSMS(mobile,tplAlias, tplKeyValue)

> 发送单条短信、批量发送相同短信

* `mobile`:[`String`|`Array`] 手机号码，批量情况下用逗号分隔或直接传入数组形式 **Required**
* `tplAlias`:[`String`] 模板别名--从`tpls`中判断 **Required**
* `tplKeyValue`:[`Object-Hash`] 模板参数键值对 **Required**

**Note**:发送短信验证码的话,需要利用tpls中定义的`content`

`tpls`关于短信验证码常用配置如下:

```json
{
  "tpls":{
    "sms-code":{
      "id":"111232",
      "params":["company","code"],
      "content":"【#company#】您的验证码:#code#"
    }
  }
}
```

### sendVoiceCode(mobile,code)

> 发送语言验证码

* `mobile`:[`String`] 单个手机号码 **Required**
* `code`: [`String`] 4-6位数字验证码 **Required**

### sendVoiceNotify(mobile,tplAlias,tplKeyValue)

> 发送语言通知信息

* `mobile`:[`String`] 单个手机号码 **Required**
* `tplAlias`:[`String`] 信息模板别名--从`tpls`中判断 **Required**
* `tplKeyValue`:[`Object-Hash`] 模板参数键值对 **Required**

import sys
import requests
import json
import base64
import datetime
import urllib3
from urllib.parse import urlparse, parse_qs, unquote
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
from google.protobuf import runtime_version as _runtime_version

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

_sym_db1 = _symbol_database.Default()

DESCRIPTOR1 = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x13MajorLoginReq.proto"\xfa\n\n\nMajorLogin\x12\x12\n\nevent_time\x18\x03 \x01(\t\x12\x11\n\tgame_name\x18\x04 \x01(\t\x12\x13\n\x0bplatform_id\x18\x05 \x01(\x05\x12\x16\n\x0e\x63lient_version\x18\x07 \x01(\t\x12\x17\n\x0fsystem_software\x18\x08 \x01(\t\x12\x17\n\x0fsystem_hardware\x18\t \x01(\t\x12\x18\n\x10telecom_operator\x18\n \x01(\t\x12\x14\n\x0cnetwork_type\x18\x0b \x01(\t\x12\x14\n\x0cscreen_width\x18\x0c \x01(\r\x12\x15\n\rscreen_height\x18\r \x01(\r\x12\x12\n\nscreen_dpi\x18\x0e \x01(\t\x12\x19\n\x11processor_details\x18\x0f \x01(\t\x12\x0e\n\x06memory\x18\x10 \x01(\r\x12\x14\n\x0cgpu_renderer\x18\x11 \x01(\t\x12\x13\n\x0bgpu_version\x18\x12 \x01(\t\x12\x18\n\x10unique_device_id\x18\x13 \x01(\t\x12\x11\n\tclient_ip\x18\x14 \x01(\t\x12\x10\n\x08language\x18\x15 \x01(\t\x12\x0f\n\x07open_id\x18\x16 \x01(\t\x12\x14\n\x0copen_id_type\x18\x17 \x01(\t\x12\x13\n\x0b\x64\x65vice_type\x18\x18 \x01(\t\x12\'\n\x10memory_available\x18\x19 \x01(\x0b\x32\r.GameSecurity\x12\x14\n\x0c\x61\x63\x63\x65ss_token\x18\x1d \x01(\t\x12\x17\n\x0fplatform_sdk_id\x18\x1e \x01(\x05\x12\x1a\n\x12network_operator_a\x18) \x01(\t\x12\x16\n\x0enetwork_type_a\x18* \x01(\t\x12\x1c\n\x14\x63lient_using_version\x189 \x01(\t\x12\x1e\n\x16\x65xternal_storage_total\x18< \x01(\x05\x12"\n\x1a\x65xternal_storage_available\x18= \x01(\x05\x12\x1e\n\x16internal_storage_total\x18> \x01(\x05\x12"\n\x1ainternal_storage_available\x18? \x01(\x05\x12#\n\x1bgame_disk_storage_available\x18@ \x01(\x05\x12\x1f\n\x17game_disk_storage_total\x18A \x01(\x05\x12%\n\x1d\x65xternal_sdcard_avail_storage\x18B \x01(\x05\x12%\n\x1d\x65xternal_sdcard_total_storage\x18C \x01(\x05\x12\x10\n\x08login_by\x18I \x01(\x05\x12\x14\n\x0clibrary_path\x18J \x01(\t\x12\x12\n\nreg_avatar\x18L \x01(\x05\x12\x15\n\rlibrary_token\x18M \x01(\t\x12\x14\n\x0c\x63hannel_type\x18N \x01(\x05\x12\x10\n\x08\x63pu_type\x18O \x01(\x05\x12\x18\n\x10\x63pu_architecture\x18Q \x01(\t\x12\x1b\n\x13\x63lient_version_code\x18S \x01(\t\x12\x14\n\x0cgraphics_api\x18V \x01(\t\x12\x1d\n\x15supported_astc_bitset\x18W \x01(\r\x12\x1a\n\x12login_open_id_type\x18X \x01(\x05\x12\x18\n\x10\x61nalytics_detail\x18Y \x01(\x0c\x12\x14\n\x0cloading_time\x18\\ \x01(\r\x12\x17\n\x0frelease_channel\x18] \x01(\t\x12\x12\n\nextra_info\x18^ \x01(\t\x12 \n\x18\x61ndroid_engine_init_flag\x18_ \x01(\r\x12\x0f\n\x07if_push\x18\x61 \x01(\x05\x12\x0e\n\x06is_vpn\x18\x62 \x01(\x05\x12\x1c\n\x14origin_platform_type\x18\x63 \x01(\t\x12\x1d\n\x15primary_platform_type\x18\x64 \x01(\t"5\n\x0cGameSecurity\x12\x0f\n\x07version\x18\x06 \x01(\x05\x12\x14\n\x0chidden_value\x18\x08 \x01(\x04\x62\x06proto3'
)
_globals1 = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR1, _globals1)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR1, 'MajorLoginReq_pb2', _globals1)
if not _descriptor._USE_C_DESCRIPTORS:
    DESCRIPTOR1._options = None
    _globals1['_MAJORLOGIN']._serialized_start = 24
    _globals1['_MAJORLOGIN']._serialized_end = 1426
    _globals1['_GAMESECURITY']._serialized_start = 1428
    _globals1['_GAMESECURITY']._serialized_end = 1481

_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC, 6, 30, 0, '', 'MajorLoginRes.proto'
)

DESCRIPTOR1b = _descriptor_pool.Default().AddSerializedFile(
    b'\n\x13MajorLoginRes.proto"|\n\rMajorLoginRes\x12\x13\n\x0b\x61\x63\x63ount_uid\x18\x01 \x01(\x04\x12\x0e\n\x06region\x18\x02 \x01(\t\x12\r\n\x05token\x18\x08 \x01(\t\x12\x0b\n\x03url\x18\n \x01(\t\x12\x11\n\ttimestamp\x18\x15 \x01(\x03\x12\x0b\n\x03key\x18\x16 \x01(\x0c\x12\n\n\x02iv\x18\x17 \x01(\x0c\x62\x06proto3'
)
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR1b, _globals1)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR1b, 'MajorLoginRes_pb2', _globals1)
if not _descriptor._USE_C_DESCRIPTORS:
    DESCRIPTOR1b._loaded_options = None
    _globals1['_MAJORLOGINRES']._serialized_start = 23
    _globals1['_MAJORLOGINRES']._serialized_end = 147

MajorLogin = _globals1['MajorLogin']
MajorLoginRes = _globals1['MajorLoginRes']

_sym_db2 = _symbol_database.Default()

DESCRIPTOR2 = _descriptor_pool.Default().AddSerializedFile(
    b'\n\ndata.proto"\xbb\x01\n\x04\x44\x61ta\x12\x0f\n\x07\x66ield_2\x18\x02 \x01(\x05\x12\x1e\n\x07\x66ield_5\x18\x05 \x01(\x0b\x32\r.EmptyMessage\x12\x1e\n\x07\x66ield_6\x18\x06 \x01(\x0b\x32\r.EmptyMessage\x12\x0f\n\x07\x66ield_8\x18\x08 \x01(\t\x12\x0f\n\x07\x66ield_9\x18\t \x01(\x05\x12\x1f\n\x08\x66ield_11\x18\x0b \x01(\x0b\x32\r.EmptyMessage\x12\x1f\n\x08\x66ield_12\x18\x0c \x01(\x0b\x32\r.EmptyMessage"\x0e\n\x0c\x45mptyMessageb\x06proto3'
)
_globals2 = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR2, _globals2)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR2, 'data_pb2', _globals2)
if not _descriptor._USE_C_DESCRIPTORS:
    DESCRIPTOR2._options = None
    _globals2['_DATA']._serialized_start = 15
    _globals2['_DATA']._serialized_end = 202
    _globals2['_EMPTYMESSAGE']._serialized_start = 204
    _globals2['_EMPTYMESSAGE']._serialized_end = 218

Data = _globals2['Data']
EmptyMessage = _globals2['EmptyMessage']

# ==================== الثوابت والإعدادات ====================

def get_ua():
    return "Dalvik/2.1.0 (Linux; U; Android 9; G011A Build/PI)"

def get_headers_jwt():
    return {
        'User-Agent': get_ua(),
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip",
        'Content-Type': "application/x-www-form-urlencoded",
        'Expect': "100-continue",
        'X-Unity-Version': "2018.4.11f1",
        'X-GA': "v1 1",
        'ReleaseVersion': "OB54",
    }

LOGIN_URL = "https://version.ggpolarbear.com/"

# ==================== دوال التشفير ====================

def encrypt_proto(payload_bytes):
    """تشفير بيانات Protobuf"""
    key = b'Yg&tc%DEuh6%Zc^8'
    iv = b'6oyZDr22E3ychjM%'
    cipher = AES.new(key, AES.MODE_CBC, iv)
    padded = pad(payload_bytes, AES.block_size)
    return cipher.encrypt(padded)

def build_major_login(open_id, access_token, platform=None):
    """بناء رسالة MajorLogin"""
    major = MajorLogin()
    major.event_time = str(datetime.datetime.now())[:-7]
    major.game_name = "free fire"
    major.platform_id = 1
    major.client_version = '2.124.1'
    major.system_software = "Android System"
    major.system_hardware = "Handheld"
    major.telecom_operator = "Verizon"
    major.network_type = "WIFI"
    major.screen_width = 1920
    major.screen_height = 1080
    major.screen_dpi = "280"
    major.processor_details = "ARM64 FP ASIMD AES VMH | 2865 | 4"
    major.memory = 3003
    major.gpu_renderer = "Adreno (TM) 640"
    major.gpu_version = "OpenGL ES 3.1 v1.46"
    major.unique_device_id = "FF_Device_ID"
    major.client_ip = "223.191.51.89"
    major.language = "en"
    major.open_id = open_id
    major.open_id_type = "4"
    major.device_type = "Handheld"
    mem = major.memory_available
    mem.version = 55
    mem.hidden_value = 81
    major.access_token = access_token
    major.platform_sdk_id = 1
    major.network_operator_a = "Verizon"
    major.network_type_a = "WIFI"
    major.client_using_version = "2.124.1"
    major.external_storage_total = 36235
    major.external_storage_available = 31335
    major.internal_storage_total = 2519
    major.internal_storage_available = 703
    major.game_disk_storage_available = 25010
    major.game_disk_storage_total = 26628
    major.external_sdcard_avail_storage = 32992
    major.external_sdcard_total_storage = 36235
    major.login_by = 3
    major.library_path = "/data/app/com.dts.freefireth-YPKM8jHEwAJlhpmhDhv5MQ==/lib/arm64"
    major.reg_avatar = 1
    major.library_token = "5b892aaabd688e571f688053118a162b|/data/app/com.dts.freefireth-YPKM8jHEwAJlhpmhDhv5MQ==/base.apk"
    major.channel_type = 3
    major.cpu_type = 2
    major.cpu_architecture = "64"
    major.client_version_code = "2019118695"
    major.graphics_api = "OpenGLES2"
    major.supported_astc_bitset = 16383
    major.login_open_id_type = 4
    major.analytics_detail = b"FwQVTgUPX1UaUllDDwcWCRBpWAUOUgsvA1snWlBaO1kFYg=="
    major.loading_time = 13564
    major.release_channel = "android"
    major.extra_info = "FF_Tool"
    major.android_engine_init_flag = 110009
    major.if_push = 1
    major.is_vpn = 0
    major.origin_platform_type = str(platform) if platform else "4"
    major.primary_platform_type = str(platform) if platform else "4"
    return major.SerializeToString()

# ==================== دوال الاستخراج ====================

def get_jwt(access_token):
    """
    استخراج JWT من Access Token
    """
    try:
        inspect_url = f"https://100067.connect.garena.com/oauth/token/inspect?token={access_token}"
        inspect_headers = {
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "close",
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "100067.connect.garena.com",
            "User-Agent": "GarenaMSDK/4.0.19P4(G011A ;Android 9;en;US;)",
        }
        data = requests.get(inspect_url, headers=inspect_headers, timeout=10, verify=False).json()
        
        if 'error' in data:
            raise Exception(f"Token validation error: {data['error']}")
        
        open_id = data['open_id']
        platform = data.get('platform')
        
        proto_bytes = build_major_login(open_id, access_token, platform)
        encrypted_payload = encrypt_proto(proto_bytes)
        
        resp = requests.post(
            f"{LOGIN_URL}MajorLogin",
            data=encrypted_payload,
            headers=get_headers_jwt(),
            timeout=15,
            verify=False
        )
        
        if resp.status_code != 200:
            raise Exception(f"Login failed with status {resp.status_code}")
        
        login_res = MajorLoginRes()
        login_res.ParseFromString(resp.content)
        
        if not login_res.token:
            raise Exception("No JWT token received from server")
        
        return login_res.token
    
    except Exception as e:
        raise Exception(f"JWT extraction failed: {str(e)}")

def convert_eat_to_access(eat_token):
    """
    تحويل EAT Token إلى Access Token
    """
    try:
        if "http" in eat_token or "?" in eat_token:
            params = parse_qs(urlparse(eat_token).query)
            eat_token = params.get('eat', [eat_token])[0]
        
        target_url = f"https://api-otrss.garena.com/support/callback/?access_token={eat_token}"
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36"
        }
        
        response = requests.get(target_url, headers=headers, allow_redirects=True, timeout=15, verify=False)
        parsed = urlparse(response.url)
        query_params = parse_qs(parsed.query)
        
        if 'access_token' in query_params:
            access_token = query_params['access_token'][0]
            account_name = unquote(query_params.get('nickname', ['Unknown'])[0])
            return access_token, account_name
        else:
            raise Exception("Access token not found in response")
    
    except Exception as e:
        raise Exception(f"EAT to Access conversion failed: {str(e)}")

def get_guest_access_token(uid, password):
    """
    استخراج Access Token من حساب الضيف
    """
    try:
        oauth_url = "https://100067.connect.garena.com/oauth/guest/token/grant"
        payload = {
            'uid': str(uid),
            'password': str(password),
            'response_type': "token",
            'client_type': "2",
            'client_secret': "2ee44819e9b4598845141067b281621874d0d5d7af9d8f7e00c1e54715b7d1e3",
            'client_id': "100067"
        }
        headers = {
            'User-Agent': "GarenaMSDK/4.0.19P9(SM-M526B ;Android 13;pt;BR;)",
            'Connection': "Keep-Alive",
            'Accept-Encoding': "gzip"
        }
        
        response = requests.post(oauth_url, data=payload, headers=headers, timeout=10, verify=False)
        
        if response.status_code != 200:
            try:
                err_data = response.json()
                raise Exception(err_data.get('error', f"HTTP {response.status_code}"))
            except ValueError:
                raise Exception(f"HTTP Error {response.status_code}")
        
        data = response.json()
        
        if 'access_token' not in data or 'open_id' not in data:
            raise Exception("Missing tokens in response")
        
        return data['access_token'], data['open_id']
    
    except Exception as e:
        raise Exception(f"Guest token extraction failed: {str(e)}")

def update_bio(jwt_token, bio_text):
    """
    تحديث البايو (اختياري)
    """
    try:
        if len(bio_text) >= 250:
            raise Exception("Bio must be less than 250 characters")
        
        key = bytes([89, 103, 38, 116, 99, 37, 68, 69, 117, 104, 54, 37, 90, 99, 94, 56])
        iv = bytes([54, 111, 121, 90, 68, 114, 50, 50, 69, 51, 121, 99, 104, 106, 77, 37])
        
        data = Data()
        data.field_2 = 17
        data.field_5.CopyFrom(EmptyMessage())
        data.field_6.CopyFrom(EmptyMessage())
        data.field_8 = bio_text
        data.field_9 = 1
        data.field_11.CopyFrom(EmptyMessage())
        data.field_12.CopyFrom(EmptyMessage())
        
        data_bytes = data.SerializeToString()
        padded_data = pad(data_bytes, AES.block_size)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        encrypted_data = cipher.encrypt(padded_data)
        
        url = "https://clientbp.ggpolarbear.com/UpdateSocialBasicInfo"
        headers = {
            "Expect": "100-continue",
            "Authorization": f"Bearer {jwt_token}",
            "X-Unity-Version": "2018.4.11f1",
            "X-GA": "v1 1",
            "ReleaseVersion": "OB54",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 11; SM-A305F Build/RP1A.200720.012)",
            "Host": "clientbp.ggblueshark.com",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip"
        }
        
        resp = requests.post(url, headers=headers, data=encrypted_data, timeout=15, verify=False)
        return resp.status_code == 200
    
    except Exception as e:
        raise Exception(f"Bio update failed: {str(e)}")
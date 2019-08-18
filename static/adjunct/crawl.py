import csv
import os
import re
import requests
import sys
import time

from  bs4 import BeautifulSoup as BS
from collections import OrderedDict
from django.utils.text import get_valid_filename, slugify

auth_cookie_txt = """AID	AJHaeXJjgiFyIaPbLSWKqfxYLEfzPV3NF_Gmc79VSzyv1MpW2BcXwfI	.googleadservices.com	/	2016-11-20T00:00:00.069Z	58	✓			
CP3	1	.scorecardresearch.com	/	2015-07-06T14:46:11.471Z	4				
JSESSIONID	54FAEBA22C905A26839EF3D20B3DCA35	premium.usnews.com	/	Session	42	✓			
UID	87756c9-184.25.157.10-1432950767	.scorecardresearch.com	/	2017-05-19T01:52:48.271Z	35				
UIDR	1432950767	.scorecardresearch.com	/	2017-05-19T01:52:48.271Z	14				
__qca	P0-736961959-1432950768216	.usnews.com	/	2016-11-27T22:35:57.000Z	31				
__utma	1.55621353.1432950768.1433899470.1434246700.11	premium.usnews.com	/	2017-06-13T02:02:58.000Z	52				
__utmb	1.26.10.1434246700	premium.usnews.com	/	2015-06-14T02:32:58.000Z	24				
__utmc	1	premium.usnews.com	/	Session	7				
__utmz	1.1433107846.2.2.utmcsr=colleges.usnews.rankingsandreviews.com|utmccn=(referral)|utmcmd=referral|utmcct=/best-colleges	premium.usnews.com	/	2015-12-13T14:02:58.000Z	124				
_cc_aud	"ABR4nC2WfUzUdRzHf9%2FAh57ublxgK6v7HSCgzbzfD1AoMyTQEqwsLkodthVKqJSlYqmk1eqQXFlthYcDrK2mbJ5lrRWI2pNWcmpS%2BVCk1aqRq8Myq2Xt%2FTr%2BuBefz%2Ffzffw8%2FSzLsqpWDhyykn%2FmTcvyzda%2FoyNSXHqRpLJzQkmtMOs5xoZLqj4mLNwn5C8VgkMgAX4T2pYJ2%2FdjuVDo%2FwFpASaLhD93aIfhTUJgrpDXLdS%2BLpSUYaJ5pqZDWJIjrIlplZZ05s0THvsOnBQqtKZVPlbovU3InCgc%2BBTldFk2MLZuj7CgV6grEB65lrF3mdejCRueFoq7mbANE450%2Bg2wXSZpE5C2cc4QR7qDlwhyiExMXuWA89n2OGvKD1awmbGHtMrcl8ALUuafEe48DxhgMWEtL4j%2FynnrYeeYvpYdkmuu4iqLhQKvEB3U2GLtYHLxdPQnIXwSnADfggF2wOHBasBtg7M4xC1ItzKhT2gYibKUI01DmiIMPsXJkDLHcwj8MONDJhQjvS8UTwUlrDIBiekHOURZNmM4IPwKUoAxG2UHaBd8rVqlkt2X5PJK92LyIhKZ4%2BKxMAk06jKULdz9Zw6%2Fnld6HkvFkrUiguUTKJ%2FEZD27N4LlgBzzkYb270xgzCYpbbIxuoxVHpXURsyHcXH8NBIpGq5HyTwb%2F9nfc6T7kHC4jcNtHO7eA2pQErQ24ea7W%2BhiQsHFKIlMN4kw237NIZLSESxngkpQAWYwD8lNSjeDm4By2srKF3ayinujkPYekkLD5CbHCA13MrgOkPbNO5GKhBZlnMkgzjIoF1EsXUdY4QKkKJJ7NRjHtpOQ8gCx5OaAMYD4dLMAYeoSmG4AXCUUjEO6AowGlwOCb7NyxRrajHIUuAT4daQmak81rqq7nXNquhmxF8sLwPlgBKA%2FuMNAqhAn2F0VJDNnA0rC26HLOP%2BCf9iINeOPgzVCD5aNVDfnV8Hv4yrKB9MpS5NzVqilLk17RtJY3sU5gSUpM58wdQgw5wvQDw4LhTy5Q8N0DoIDgk3pctTcTNEcSc30DucTlHch7UWi8jm7QC%2FAHQ69o5kqFQfO2%2BAtQIusZKyLztVVyDyXi03lYtcIVVuEctpgZxFgXvmPmLSjVHya1NekXKmqaJoIvjQeqxHH9VCl4gRKhp%2Fd8fvQhVJuov95KTNd%2BrUifwu1FKTEX0IfnaSTJrV7KYegSqU%2BCB5gsXmSRlLkdq3mQaqEMykamzQgpB8HR8BXMgnwqRIgdgMfcyOqxsYKLHFqhBbSeAP7vczYR1L6QT0P2bEPSGlypoDrOdl45r0jLOLTwRtgPz2rmb0V4KPIJtAmZNNJItrdqiI3d8eFrORiJImXTukl%2FxI4x0v%2Becm%2FxLNIfBB4eWsaukknN7NXIfFZ4cE5nrOAjEvweeChI3jIv%2BVD3KEJpdqZSflDUusvksbQVzzfcCMu1krv8JB4Hnzk%2BZIxLNupS9MVkWYynyop%2FeAw%2BFwm9fo6tEIfoIyDPvAZq%2BzAksDcyndkCkm5mqpffVTSlVt4CYp4WoNwP3WiNI8xingpVbiOnN6jhmIK8cOhGu6urwSrG69E6Hj1p9h9naQYrTVErkwkrmN8F8QGwSlMHkbCAfvxUYgDhujhMV4%2BRA8P0adDPLnf8%2F%2FPf3kKahc%3D"	.crwdcntrl.net	/	2016-03-10T02:02:59.308Z	1749				
_cc_cc	"ACZ4nKXU20%2BScRzHcZ7WSbhwbd3m7KrVVkslij%2BkP0Bz%2FRVdlErk2WGYmkrKYtAcWmoJlosS5yESEUIlRvO8POQ0j0nEOD383rc9V98Xn%2B%2BP3%2BE5KPI12sKiYo22WF1aUFBUUnK79Ja6uEBz847m3v1CrVZdpIhfdx%2F8mGnf6o3lKtKX46135bzkuKqISZIiNiDXhn65drqun%2FVIlvJYLDfO6YuWcLJqzNs5SlbOU%2BnKemF0KFmlBjv%2BZ7Ctx6hM16YP8orsQ3JdVr2e6YkY5P7lWvn3lhq51lfKde9Ss0oynzuJJWdV9MB22AY7fpWrpIn8jPvghv7Eeo7SXq5IzL2ftnUysY%2BMX9Yh7zQKdunE3KAXHTIm%2BvfSHmvYVUq%2BKxN%2FUx5c1OVkuwd%2BBccWRAf1jwSPw7OPRdt%2Fx9dXe6kpmu63mlTShjrjFUvcpssZB%2BeMKungRsYVbYc5kvtax0nKRneVMts6ODoiuhzjQ5GB01nPm8Kw7jqT7QXvseDB5P3M%2BB3cm9zf8WHKnV5%2FjjSbN7qWcmBadOuTEWW2vwfEPIr%2BN8hfw41wR4Nf%2BP9WuAXe9Ivjl2Ed%2BsPID%2BvF%2FACeRv8u8h3Yg%2F5u2AZb4C64Hef9DLkRfsr1zoj2w1OwGTbBdfBD%2BMAneg%2Fehn%2FCIXgeDsBf4HG4A%2Bc3inwYdsI2uAt%2BDjfB9XAtXAOXwcd4n4KwD3bDn%2BD3sBPug81wM1wF6%2BE%2F%2BJ5YcD92kW%2FDbejfRL4Br8GrcBgOwfPwHDwL67C%2BAPIy5DPIffAkPAGPwZ%2FhYdgJ98F2uJvze0RbkXuQT8Fm7hf5C54v8hbkz%2BAI%2Bg3IF5HXI6%2BGK%2BF1jN%2BEdeiPToneh7fgDXgVXoIX4QgchoPwNzgAe%2BGv8BjshkdgF%2FwR%2Fgc75OXP"	.crwdcntrl.net	/	2016-03-10T02:02:59.308Z	1006				
_cc_dc	0	.crwdcntrl.net	/	2015-06-20T01:24:30.010Z	7				
_cc_domain	.cc.usnews.com	.crwdcntrl.net	/	2016-03-10T01:51:40.947Z	24				
_cc_id	6923a69a4d113bb7d54a16086cf29943	.crwdcntrl.net	/	2016-03-10T02:02:59.308Z	38				
au	IADRDB0N-A9LF-10.208.162.44	.rubiconproject.com	/	2016-05-31T10:33:27.887Z	29				
auth	"dRsYorp2RVn28S5YWRBvRm6WcTUVqONLlbvJgONldy-vaNcEC3o9BoMPoI_cnK0L97NS-LDGurZnuvkGhXwuyjvl2UCd_5x636NcsVSlVT4S-WF0hMeRqXajSrcT0qlB3RNkhMKaViQQtqsYpT0j_6LBrHF56fEva3Uoi7oIpL4Ak5HdJAkPs6khL1FUkaTvpOzfWuuBJLwy4yHursM0wqy1bej0J-uLefW99saIErj8uFzdOVIDwuuTrYjCV2GP.eNpNyjsOgCAQANGrmK0t-Ap4AY9hUHYTImKCVBrvLnaW8zI3UCxnnbPfEcYOJr-UiAn6DpL_O9Yr4scxtBbMKqlNy3psmL-DSBhHSgrBVhUkcz6Q5Xww0ihtg4XnBfo1HrU"	.usnews.com	/	2015-07-14T01:51:38.606Z	394				
c	2086442054	.usnews.com	/	2015-06-15T01:51:38.738Z	11				
cd	false	.rubiconproject.com	/	2016-05-31T10:33:27.887Z	7				
cms.ab	d3a3a1aa-3b49-4b0e-960a-7e2c7b321ac0	premium.usnews.com	/	Session	42				
compstat	compstu	.usnews.com	/	2015-06-15T01:51:38.739Z	15				
d	EKgBzwEBsxKBcNLfk-LCC--DCosl7NTx2MTiw2BQAg6FDvwyIQTBPOJuw7GYohj14azxOfgQxQAOuzAR6Ve4uiC9vhoRCIEMrVkQDt4Vn0CPgcKIkbLslKKvey18LNSy-TotdI1PLrXiAMx7EA	.quantserve.com	/	2015-09-12T01:51:31.301Z	147				
ki_r		premium.usnews.com	/	2020-06-13T02:02:59.000Z	4				
ki_t	1432950768343%3B1434246700817%3B1434247379208%3B8%3B65	premium.usnews.com	/	2020-06-13T02:02:59.000Z	58				
linkedin_oauth_9r49w3dlk9xn_crc	null	premium.usnews.com	/	Session	35				
mc	556917ef-81aab-1728f-e4d28	.quantserve.com	/	2016-11-28T01:52:47.878Z	28				
s_cc	true	.usnews.com	/	Session	8				
s_sq	%5B%5BB%5D%5D	.usnews.com	/	Session	17				
s_vi	[CS]v1|2AB48BF7851D159B-4000190C4000237F[CE]	.usnews.122.2o7.net	/	2017-06-13T02:02:59.042Z	48				
s_vi_elx7Fx7Flex7Ejabola	[CS]v4|2AB686C3050123AB-400001368000DC34|556D0D85[CE]	.2o7.net	/	2017-06-01T01:57:26.187Z	77				
s_vi_fox7Ccox7Cekzxxkiox7D	[CS]v4|2AB686C3050123AB-400001368000DC32|556D0D85[CE]	.2o7.net	/	2017-06-01T01:57:26.187Z	79				
s_vi_mfx7Cax60kjx7Bx7Ex7Cajxxx3C	[CS]v4|2AB49470851D3109-40000142601B3058|556928E0[CE]	.2o7.net	/	2017-05-29T03:05:05.425Z	85				
s_vi_rx7Bhjvx7Btx7Fnruvvcmuux7Evx7Bilx7Fx7Dx7Bi	[CS]v4|2AB686C3050123AB-400001368000DC30|556D0D85[CE]	.2o7.net	/	2017-06-01T01:57:26.187Z	100				
tk	ff279f43220c4d309adf8116737458d8	.usnews.com	/	2015-06-15T01:51:38.738Z	34				
usnQuantCast	D%2CT	.usnews.com	/	2015-06-15T01:51:39.000Z	17				
usn_colleges_interstitial	2	premium.usnews.com	/	4753-05-11T02:02:59.000Z	26	"""

AUTH_COOKIE = text_to_Cookie(auth_cookie_txt)

PARAMS = [('national-liberal-arts-colleges', 10),
          ('regional-universities-north', 8),
          ('regional-universities-south', 6),
          ('regional-universities-midwest', 7),
          ('regional-universities-west', 6),
          ('regional-colleges-north', 3),
          ('regional-colleges-south', 5),
          ('regional-colleges-midwest', 5),
          ('regional-colleges-west', 3)]

URLPRE = 'http://premium.usnews.com'


def try_num(x):
    try:
        return int(x)
    except ValueError:
        try:
            return float(x)
        except ValueError:
            return x


def text_to_Cookie(ct):
    lines = ct.split('\n')
    cookie = {}
    for l in lines:
        fields = l.split('\t')
        try:
            cookie[fields[0]] = fields[1]
        except IndexError:
            pass
    return cookie


def get_lists(list_name, pages):
    base_url = URLPRE + ('/best-colleges/rankings/%s/data' % list_name)
    page = requests.get(base_url, 
                        cookies=AUTH_COOKIE)

    list_dir = os.path.join('data', list_name)
    if not os.path.exists(list_dir):
        os.makedirs(list_dir)
    
    save_path = os.path.join(list_dir, 'list_p1.html')

    with open(save_path, 'w') as f:
        f.write(page.text)

    for i in range(2, pages+1):
        url = base_url + ('/page+%i' % i)

        savepath = os.path.join(list_dir, ('list_p%i.html' % i))
        print("Fetching %s" % url)
        print("Saving as %s" % savepath)
        print('')
        page = requests.get(url, cookies=AUTH_COOKIE)
        with open(savepath, 'w') as f:
            f.write(page.text)
        time.sleep(10)


def get_other_lists():
    # already ran for national universities
    # fetch table html for liberal arts and regional schools
    
    for p in PARAMS:
        get_lists(p[0], p[1])
                  

def get_rows(category, page):
    path = os.path.join('data', category)
    with open(os.path.join(path, 'list_p%i.html' % page)) as f:
        s1 = BS(f.read())
    return s1.find_all('tr')

        
def parse_lists(category):
    # loop through html files, extract data from <table> element, save
    # in one big csv file
    path = os.path.join('data', category)

    fieldnames = ['rank', 'location', 'school_name', 
                  'url', 'tuition', 'enrollment']

    with open(os.path.join(path, 
                           'list_%s.csv' % category) , 'w') as outfile:
        writer = csv.DictWriter(outfile, fieldnames = fieldnames)
        writer.writeheader()
        lists = len([l for l in os.listdir(path) if 'list_' in l])
        for i in range(1, lists):
            trs = get_rows(category, i)
            for tr in trs:
                try:
                    # Extract data from table cell by cell
                    tds = tr.find_all('td')
                    if not tds:
                        continue
                    rec = OrderedDict()
                    print(tds[2].a.text)
                    # rank
                    rec[fieldnames[0]] = tds[1].span.text
                    # Location
                    rec[fieldnames[1]] = tds[2].p.text
                    # Name
                    rec[fieldnames[2]] = tds[2].a.text.replace(';', '')
                    # URL
                    rec[fieldnames[3]] = tds[2].a['href']
                    
                    # Tuition
                    rec[fieldnames[4]] = tds[3].text.strip()
                    
                    # Total enrollment
                    enrollment = re.findall('\d', tds[4].text.strip()))
                    rec[fieldnames[5]] = ''.join(enrollment)

                    writer.writerow(rec)
                except:
                    print(sys.exc_info()[0])
                    continue


def parse_other_lists():
    # collect data from liberal arts and regionals into a csv
    for p in PARAMS:
        parse_lists(p[0])


def get_records(fname):
    records = []
    with open(fname) as f:
        reader = csv.DictReader(f)
        for row in reader:
            for k in row.keys():
                row[k] = try_num(row[k])
            records.append(row)
    return records


def save_records(records, fname):
    with open(fname, 'w') as f:
        writer = csv.DictWriter(f, fieldnames = records[0].keys())
        writer.writeheader()
        for i, rec in enumerate(records):
            print("Saving %s - %i of %i" % (rec['school_name'], i+1, len(records)))
            writer.writerow(rec)



def save_school(school):
    url = URLPRE + school['url'] + '/rankings'
    page = requests.get(url, cookies=AUTH_COOKIE)
    filename = 'data/schools/%s.html' % get_valid_filename(school['school_name'])
    with open(filename, 'w') as f:
        f.write(page.text)


def get_rankings(category):
    # fetch the web page for each school with extended info and save to disk
    records = get_records(os.path.join('data', category, 'list_%s.csv' % category))
    for rec in records:        
        print("Fetching %s" % rec['school_name'])
        url = 'http://premium.usnews.com' + rec['url'] + '/rankings'
        page = requests.get(url, cookies=AUTH_COOKIE)
        filename = get_valid_filename(rec['school_name']) + '.html'
        path = os.path.join('data', category, 'schools')
        if not os.path.exists(path):
            os.makedirs(path)
        with open(os.path.join(path, filename), 'w') as f:
            f.write(page.text)
        time.sleep(10)


def get_other_rankings():
    for p in PARAMS:
        get_rankings(p[0])


def parse_rankings(category):
    # open each school file, extract data from html table
    # add to record dict and save all info to new csv file
    list_file = os.path.join('data', category, 'list_%s.csv' % category)
    records = get_records(list_file)

    print('PARSING RANKINGS FOR %s' % category)

    for i, rec in enumerate(records):
        schoolfile = get_valid_filename(rec['school_name'])
        filename = 'data/%s/schools/%s.html' % (category, schoolfile)
                                                
        print('processing %s. %i of %i' % (filename, i+1, len(records)))
        with open(filename) as f:
            s1 = BS(f.read())
        trs = s1.find_all('tr')
        for row in trs[5:]:
            tds = row.find_all('td')
            key = slugify(tds[0].text.strip()).replace('-', '_')
            value = tds[1].text.strip().split('\n')[0]
            rec[key] = value

    with open(list_file, 'w') as outfile:
        writer = csv.DictWriter(outfile, fieldnames=records[0].keys())
        writer.writeheader()
        for rec in records:
            writer.writerow(rec)


def parse_other_rankings():
    # parsing rankings other than national universities
    for p in PARAMS:
        parse_rankings(p[0])

            
def find_school(name, records):
    results = []
    for rec in records:
        if name in rec['school_name']:
            results.append(rec)
    return results


def open_school(name, records):
    school = find_school(name, records)
    school = school[0]
    filename = 'data/schools/%s.html' % get_valid_filename(school['school_name'])
    with open(filename) as f:
        s1 = BS(f.read())
    return s1


def percentages(rfile):
    records = get_records(rfile)
    for rec in records:
        for key in rec.keys():
            try:
                if rec[key][-1] == '%':
                    rec[key] = float(rec[key][:-1])
            except (TypeError, IndexError):
                pass
    save_records(records, rfile)
    

def clean_fields():
    records = get_records('data/list_national_2.csv')
    for rec in records:
        del(rec['6_year_graduation_rate'])
    save_records(records, 'data/list_national_2.csv')
    
    

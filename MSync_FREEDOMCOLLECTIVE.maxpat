{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 5,
			"revision" : 3,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 125.0, 234.0, 915.0, 301.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 0,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"assistshowspatchername" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 898.0, 379.5, 55.0, 22.0 ],
					"text" : "dac~ 5 6"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 0,
					"patching_rect" : [ 650.5, 386.0, 55.0, 22.0 ],
					"text" : "dac~ 1 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"lastchannelcount" : 0,
					"maxclass" : "live.gain~",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "signal", "signal", "", "float", "list" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 894.5, 229.0, 48.0, 136.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 711.5, 110.467018469657006, 48.0, 136.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : ""
						}
,
						"valueof" : 						{
							"parameter_longname" : "live.gain~[1]",
							"parameter_mmax" : 6.0,
							"parameter_mmin" : -70.0,
							"parameter_shortname" : "Back",
							"parameter_type" : 0,
							"parameter_unitstyle" : 4
						}

					}
,
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "live.gain~[1]"
				}

			}
, 			{
				"box" : 				{
					"basictuning" : 440,
					"clipheight" : 29.0,
					"data" : 					{
						"clips" : [ 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/FLT_PA_Back.mp3",
								"filename" : "FLT_PA_Back.mp3",
								"filekind" : "audiofile",
								"id" : "u151003538",
								"loop" : 0,
								"content_state" : 								{

								}

							}
, 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/NOT_PA_Back.mp3",
								"filename" : "NOT_PA_Back.mp3",
								"filekind" : "audiofile",
								"id" : "u208003541",
								"loop" : 0,
								"content_state" : 								{

								}

							}
, 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/PNO_PA_Back.mp3",
								"filename" : "PNO_PA_Back.mp3",
								"filekind" : "audiofile",
								"id" : "u370003520",
								"loop" : 0,
								"content_state" : 								{

								}

							}
 ]
					}
,
					"followglobaltempo" : 0,
					"formantcorrection" : 0,
					"id" : "obj-18",
					"maxclass" : "playlist~",
					"mode" : "basic",
					"numinlets" : 1,
					"numoutlets" : 5,
					"originallength" : [ 0.0, "ticks" ],
					"originaltempo" : 120.0,
					"outlettype" : [ "signal", "signal", "signal", "", "dictionary" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 894.5, 127.0, 150.0, 90.0 ],
					"pitchcorrection" : 0,
					"presentation" : 1,
					"presentation_rect" : [ 711.5, 8.467018469657006, 179.0, 90.0 ],
					"quality" : "basic",
					"timestretch" : [ 0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-12",
					"lastchannelcount" : 0,
					"maxclass" : "live.gain~",
					"numinlets" : 2,
					"numoutlets" : 5,
					"outlettype" : [ "signal", "signal", "", "float", "list" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 650.5, 229.0, 48.0, 136.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 515.5, 110.467018469657006, 48.0, 136.0 ],
					"saved_attribute_attributes" : 					{
						"textcolor" : 						{
							"expression" : ""
						}
,
						"valueof" : 						{
							"parameter_longname" : "live.gain~",
							"parameter_mmax" : 6.0,
							"parameter_mmin" : -70.0,
							"parameter_shortname" : "Front",
							"parameter_type" : 0,
							"parameter_unitstyle" : 4
						}

					}
,
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"varname" : "live.gain~"
				}

			}
, 			{
				"box" : 				{
					"basictuning" : 440,
					"clipheight" : 29.0,
					"data" : 					{
						"clips" : [ 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/PNO_PA_Front.mp3",
								"filename" : "PNO_PA_Front.mp3",
								"filekind" : "audiofile",
								"id" : "u496003158",
								"loop" : 0,
								"content_state" : 								{

								}

							}
, 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/NOT_PA_Front.mp3",
								"filename" : "NOT_PA_Front.mp3",
								"filekind" : "audiofile",
								"id" : "u251003155",
								"loop" : 0,
								"content_state" : 								{

								}

							}
, 							{
								"absolutepath" : "SSD-Sys:/Users/swrexperimentalstudio/Documents/GitHub/MSync/FLT_PA_Front.mp3",
								"filename" : "FLT_PA_Front.mp3",
								"filekind" : "audiofile",
								"id" : "u657003152",
								"loop" : 0,
								"content_state" : 								{

								}

							}
 ]
					}
,
					"followglobaltempo" : 0,
					"formantcorrection" : 0,
					"id" : "obj-5",
					"maxclass" : "playlist~",
					"mode" : "basic",
					"numinlets" : 1,
					"numoutlets" : 5,
					"originallength" : [ 0.0, "ticks" ],
					"originaltempo" : 120.0,
					"outlettype" : [ "signal", "signal", "signal", "", "dictionary" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 650.5, 127.0, 214.0, 90.0 ],
					"pitchcorrection" : 0,
					"presentation" : 1,
					"presentation_rect" : [ 515.5, 8.467018469657006, 179.0, 90.0 ],
					"quality" : "basic",
					"timestretch" : [ 0 ]
				}

			}
, 			{
				"box" : 				{
					"autofit" : 1,
					"data" : [ 8815, "png", "IBkSG0fBZn....PCIgDQRA..BXO...fkHX....PsJx7T....DLmPIQEBHf.B7g.YHB..f.PRDEDU3wY6cmGcTTk8.G+RBiJKsH3XinwEhL.FznDMRF83HlYPDQDQjHKBxnCJJKCAcFPwABxhCJDPkUU.G.ADl.ACHhrJwfwHfxpPHxZXKJjDR.RrSx62evOXn5pRRuT8Rp78y4zmC0KccqKcW8qucUu5U0PDQI.....nJsPBzI......7dTXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.0LPm.UWX2tcSKVm+7mWJnfBb4muMa1jZUqZ4QaqbxIGOZ8pLdSNYDOMOMy2WBT4f6t+fYpxxceUtcwsquZ+SWYaGHec2S3J6m4ue8zU5GvWjS1rYSDQBXu+En29hDbz2WEwU12vL+LnY95gyb0Wera2tK+bu3qO9iOy5I82FHq4Ahn3gu6QbwEm5zm9zJyTYkUlZYKaYU511lMapcsqc40aqryNa0pW8pUevG7ApN0oN40ulricrCS5Uh+mibjinZZSapKmC8su8UctycNSMGb3vg5C9fOvkyA61sqN3AOnorsyM2bUokVZpoO8oq5Se5iOYe4niNZ0nG8nUojRJp8u+8qJszRcob63G+3p0rl0nl3DmnWu+iyedxgCGpgNzg5W9rbzQGslscIkTh5+7e9O9kss69HhHhPMxQNR0RVxRTYlYlpRJoDW58phJpH01111TyadySMjgLDkc61M07pyctypIMoIoV25Vm5jm7jtTNUZokpxJqrTKaYKSMpQMJUzQGsGu8sYylZKaYKWJtojRJ902WBzaeQBN56ynGuvK7BpoMsooRKszbquy7XG6XpUu5UqlvDlfpCcnCt81cFyXFJGNbXpud3r7yOeUW6ZWK2bnsssspyblynTJkpvBKT8hu3KVg47zm9zuTNmSN4nBO7v8Y6ulYlYdo+e7se62VoqSTQEkK+Ya2Q5omte+yJUgeDvS.K8iUu5Ua56feQU1W51yd1Sex1M4jSVYylMO50iXiMVeRNoTJ0a7FugKmGabiazmjCETPAtbNzm9zGeRNnTJ02+8euo1YeBIjfo8keKYIKwi2+wnOOUXgE5wwycdr90udC++SXgEV.uelK+Q7wGu57m+7lx6Um3DmP0111VuNmrYylJojRxTxIGNbnF4HGoGkGcsqcUW7dfG3A7au2Dn29hDbz22k+HrvBSkd5oaZ4w7l27bqsuY+ibJOKe4KubygoMsoo44lVZoUg4bN4jilm+Tm5T8I6qL7gObc++nxVmQO5Q6ydMza9Q8UmdvXr2GqAMnA9rXeMWy0Tg+85Uu54S1tcricTxJqrj129161q60dsWqOHit.24+u9pWapacqqK+b8k6abu268JacqaU5d26tWEG61sKqcsqUFwHFgTyZZNibuN0oNI6d26VZcqasautF8ZVcpScj90u9YBYV4qoMsoxC8POjg+Me4ov2cXylMIkTRQRLwDkq5ptJSIlMrgMT9hu3KjwO9w6wwH5niV1111l7TO0SYJ4TMqYMkgO7gKokVZRXgElast+9e+uWWa9y2+BzaeQBN566hhKt3jcricHspUsxzxidzidH6ae6ShJpnbomuYNjPqHWb3WYDm+t75W+5Wgwp3hKVyxO5i9nddhUAdxm7I0r7u8a+VktNUVt6M7kemoUBE1WEUIkThjWd4Ev191saWlyblSE1Yk+VfX7V6rSe5SGnSgKod0qdxblybjHiLRONFyZVyRhM1XMwr5BBKrvjjSNYSa+mW7EeQSINkmAO3AK0nF0vmtM7VyblyTd7G+wM83FRHgHu5q9pR7wGuGs9KaYKSZbiarImUhb+2+8KKdwK1ziK7LtaeeQDQDxm9oeZkd.p7DMoIMQ97O+ycom6IO4IM8suQN1wNloEqTSMUMK23F2XooMsolV7E4BeG+ccW2kl1xHiLL0sg653G+3AzseUEbwy5mUTQEIYmc1dULN+4OuLsoMMOpP18su8IG8nG0kdtgDRHxMcS2jby27MKgFZn596MnAMPFyXFiLvANP2NOtbG5PGRb3vgWEizSOcYBSXBd75WXgEJm3Dmvqxg7yOeYLiYLdULN1wNlbtycN2Zctlq4ZL7HAJhHgFZnxDlvDj1zl1314xC7.OPEdVYJt3hkidziJkUVYk6yogMrgkaw60qd0SRLwDk9zm9314lyZbiarzoN0IYoKcodcrLR25V27Iw0rDczQKctyctb+6kTRIR1YmsTRIkTtOmZUqZIMpQMRBIDiOdOCaXCS93O9icqKhsDRHAoQMpQk6e+Lm4LUX+XgFZnxMdi2nbEWwUX3eOlXhQ5d26tL+4OeWNmfVAp99F+3GeEdV.O0oNkjat4VgwnQMpQRcpScL7uci23MJIjPBRBIjPEFigMrgICbfCTpcsqcklyMoIMQyxm6bmykJX+HG4HRhIlXk97bUqbkqTWeRctycVd629sMssQG5PGz0WvpW8pc63TRIkHG7fGzqxEGNbHKXAKP1912tWEmpSB3iGHq7iKdgRcQaYKawuss6e+6utwnV7wGuGEqd1ydZ3EzTQEUjaMVt6RW5htX3NWzql0issssoIGV7hWreOGFxPFhtWK7zwyrMa1TcricTkUVYY3XSzShaZoklt3TZokplvDlfJhHhvkiSXgElpu8supbyMWcwygCGtUrb9ySWt0t105SdeZfCbfk61ToTpnhJJ+99NN+n7F2zyd1yVEYjQ5VwJlXhobu1fF+3GuasOYd4kmtXjWd4od4W9kcqqMgHhHB069tuqgWDvG7fGzkiiQ8IZFSH.UU19hDbz2W4csVczidTUbwEmacQaGVXgo5e+6uJ+7yWW7xO+7M0q+lCe3CqI9qbkqzTh6BVvBzD2cu6cWgOea1ro6Zd5q+5u1TeO5+9e+u5d8zU5qaJSYJZVmicri422+hGA9DvR+vpTXuHWXVb4.G3.5h4DlvDb4XPg8+uGlYg8W9iu3K9BcwM0TS0shQqacq0ECGNbnZSaZiGmWgEVXp8rm8nKtKZQKxkiQEUXeYkUlOYeoJalkJPWX+C9fOng4UO6YO8p3lPBInKlm6bmykW+25sdKcq+ANvA7pK13G7AePCuvfekW4Ubo0OPWXcfd6KRvQeeqacqS2qCYjQFdUQ3gEVXpe9m+Ycw8e+u+2lVdGrTXuHh569tuSy5TbwEap+HFmOPdtZA5TXef+Aiwd3xxImbjQMpQoqcmO8jHv5EewWT2E4TDQDgaEi69tuacsM+4OeO5TwdQYmc1xvF1vz0dKZQK73Xd4pQMpg7Zu1qYJw5hhM1Xc6W672ZYKaot1VyZViL24NWuJtIjPBxO8S+jl1pUspkKeQIdG2wcnqsQNxQ5UCEwTSMUYlybl5Z24wBLBtYzmohO938p4p7ryNaYDiXD5Z2n8CsB9pu5qzr7UbEWgzt10NSI1O3C9f5tHXW25VmoDa36Qg8vsLqYMK4PG5PZZ6Vu0aMvjLvPYmc1xm8Yell1ZPCZfacgpda21soqsQNxQ504VRIkjrqcsKMsYlWXkcqacyTuftGv.FfoEKeEitn4LqwZ667Nuit1ZdyatKstN2uvgNzgjO4S9DuNmdq25szcsBvAWnpkF1vFpY4TSMUIszRyqi67l27j8su8oosvCObuNtAiL5hCtCcnClRrM5hveUqZUlRrguGE1C21t28t0r7sbK2R.JSP44G9gePWatyQF24hsyKu7j8u+8604kHh7i+3OpY4ZUqZ41Sagkm5V25J8su80Thkc618IyxLlMiJbwrN5ZaZSaRWat5rugy6CsyctSSImxImbzMA.XUKdyJxny3y1111Ls367EXoU8.O88e+2K+xu7KZZ6O+m+ylRraaaaqlkKojRjjSNYSI1v2iB6ga6vG9vZVtd0qdAUS6kPLrHbW8HsJh9hx71YxoKmy6+Hh4MbbDw7l5KiO93Ms4teeImeuxLmxUyLyLEkRooMiNaNNylMa5lFCOxQNhokWNu+nY8CCgumQ8C4syZJWNm6ewLOvAAaV6ZWqlkaTiZjDczQ6Uwztc65lhj25V2pWMLof+EE1C2lQSWlW20ccAfLAkmCbfCnqM24l6gyEkYlyAyF8iDLyabYMoIMwTNkz+0+5e0DxFeOmugCY1y0ym5TmRyxtx7NtQ8G3pSyttBm2erl0rlbvEphvn9gLyezmQwxpdiMxngGi2122S9jOot6YGdy0VE7+nvd31bk69bHvxn4qbmOxqtiRKsTuIczvaumE3LmuHxDQ756sB8rm8T23.VDiGhSAapn4pdOgY89kY99N8AYsXl6aX18uDLKojRRWeyd6cgViV+ku7k6UwD9WTXO.pRaxSdx5ZK1Xi0qtSL9JuxqnqsCbfCHqYMqwiiI.fYpfBJP2AaHpnhxqN6UO7C+vZV9Tm5TR5omtGGO3+Qg8.nJsTRIEYu6cuZZKjPBQhO938n3EUTQIwDSL5ZeFyXFd0Y8npJm++b0wWC.BV47YrLzPCU5RW5hGEqV25Vqan1s90udON2PfAE1Cfp7lwLlgt15d26tGEKilhKO6YOqL0oNUOJdU0sm8rGMK67zUJPvDmOB1EWbw5lobrRRIkTz01i8XOlGEq1291qqsu7K+ROJVHvgB6APUdSbhSTNyYNil1t5q9pc6iZuMa1j3hKNcs+Ye1mUscVgXLiYLxl1zljrxJKIojRRlxTlRfNk.JWokVZxTm5Tk8su8I6XG6vqudaB1kd5oq6BbO1Xi0ih0i7HOhlkKqrxL7GNffaTXO.rDl+7mut1doW5kbqX7JuxqH0t10VSaJkRlvDlfWkaUkst0sN4AdfGP9C+g+f7zO8SapS8o.9B8qe8SZZSapDYjQJe3G9gA5zwmy46aE0u90WZcqasaEC61sK24cdmZZam6bmRN4ji2ldvOiB6gaypN0ggp1l3Dmntw+cyZVyL7zKWd9a+s+lt113F2ntaJa..AKLZ3x3t2b8dpm5ozMMWZzLNFB9Qg8vs47cZVkRYZ2URA7TYlYlFdGWs+8u+tz52912doIMoI5Z+C9fOvqyM..ekEu3EKkUVYZZy46drUFillKWwJVgWkWHvfB6gay4B6cd78ADnXz3+9QdjGQBO7vqz0se8qe5Z6PG5PRRIkjoja..9BETPAxO9i+nl1ZQKZgX2tcWNFNOzcxO+7kMrgMXBYG72B9ueoifJQDQDx8du2ql1716JoCZPCxi+wAm5TmRl4LmoWegMFQDQHiZTixiW+u5q9JI0TS0qxA38V5RWpbfCb.owMtwWpsPBIDYvCdvU3QtO7vCW2ENlHR0hwmKpdi99rF9pu5qjnhJpKsbMpQMj3hKNCuOe3rXiMVc2Aq23F2nojW1rYyq1+Zu6cux7l27Lkbo5BJr2OqYMqYd0M6gMtwMJ+y+4+zDyH2yXG6XkZVSs61jQFY3Uw7ke4W1qV+V0pVIcqacyqhQDQDgDQDQ3wq+vF1vjlzjlvPRJHvG8QejL1wNVMs0idziJrv9ALfAHgFZnZZ6bm6bLLbfkG88YMr7kubYnCcnZZ6wdrGykJr2nqCIyZ70W25VW4Mey2zqiwzm9zMk7o5.Jr2OqN0oNRqZUq730uUspUxl27lkEsnEYhYUkylMaxG8QejzwN1Qc+s.cwOt6XIzWnF0nFRm6bmk28ce2.cpTs2jm7jk27MeSMytMWy0bMx.G3.k2+8eeCWmd0qdoqsEsnEUscJtDvUQeeAGRKszjbyMWo90u9Wps+ze5O4RqqQmsxjSNYSK27Vsu8smB6cCTXeUP29se6d75FWbwIEVXgtzyMzPCUtka4Vjl27lK2+8e+FNd81zl1T.+l+QHgDbbohDrjGU2UPAEHKZQKR5cu6sl16ae6qgE12m9zGCmoml3DmnuJEArTnuufCqacqS5bm67kVtN0oNR6ae6qvKBV61sKsnEsPSa6YO6InZZs04ylJpXTXeUPEUTQd75FSLwHwDSLlRdTRIkDPGVPWzl27lCzofHhHey27MA5T.++l3DmntB6u8a+1k1111JqZUqRS6FMTvRM0TC3+fUfpJnuufCqbkqTSg8hHUZg8O8S+z5llKW6ZWqOI+7Te228cA5TnJEJruJl8rm8Hyd1yNPmFRwEWr77O+yKokVZdcrRLwDke8W+UOZcyM2bkO8S+TuNG1912trvEtPOZcUJkjVZoYJuV.yw1291kMsoMI2+8e+ZZe.CX.ZJrOlXhQZYKaot02UFWp.VAz2m0QJojhTVYko4LnXzvr4x4qmlKKnfBj29seaOd8yJqrjEu3EaZ4S0ATXue1O7C+flqb8phxKu7j3hKNY0qd0lR7lwLlgjYlYZJwxSkYlY5Uc9ffOSYJSQWg8O5i9nRXgE1kNMy+8+9eW25cjibD+90vBPfB88YcjSN4H6XG6Ptq65ttTa21scaRSaZSK2ui8gdnGRyxm6bmSV4JWookSEVXgr+keFCLN+LmuyXVUyG+werby27MaZE0C3qL+4OecSEqgFZnxq8ZulHxEtfv6Tm5jt06i9nOxuje..lMilMaLpeNQDoMsoMxUe0Wsl1XXUU0GGw9pYRKszjctycVoOu67NuScGsy4N24J8oO8wWkZ.ltYNyYJ+q+0+RSa8pW8RFzfFjL3AOX4JuxqTye67m+7xjlzj7moH.foIkTRQ9G+i+gl1dzG8QkwMtwo649XO1ioqMmuFjPUOTXe0LIkTRtzr8Q3gGtru8sOMiUOi5D.HX1jm7jkgLjgHWwUbEWps5W+5KCX.CPdgW3Ez87W7hWLSwk.nJqTSMUcS6k+w+3ezvmav9zbI7LLTbfg1+92urt0sNMscsW60502Lo.7mxImbjktzkpq82+8ee4ltoaRW6u268d9izB.vmYCaXCZV9JuxqT5RW5hl1BKrvzciIa+6e+biFyBfB6Q4ZpScp5Zqe8qeAfLAvy4pCslMsoMIacqa0GmMU8zl1zFYsqcsx1111jYO6YK1rYKPmR.UnIO4IKaaaaSRO8zk3hKt.c5328ke4WpqMmOi6O4S9j5dNAaSykvyPg8nbszktT4vG9vZZqEsnEAE2oWAbUomd5tTA6A56fxAqRHgDjXiMVIxHiT5cu6s7FuwaDnSIfxUaZSaj90u9IQFYjRqZUqBJldn82RN4j0MQc37vtwno4Ryb1vAANTXOpPyZVyRWaFMEABDLyny9zk6nG8nd7b4sUWiabi0r7cbG2Q.JS.pbMqYMSyx0t10VhLxHCPYSfwEm1Kub2vMbCZlpscdZtrnhJxvgsHp5gB6QEJwDSTJt3h0z1i7HOhDd3gGfxH.22Lm4LqvaBZLEWB.qDilRp6XG6nHhHssssUpacqql+V5omteIufuGE1iJTAETftqR9PCMT4Ue0WM.kQ.dlO4S9DCaunhJRRLwD8uIC.fOzxW9x001EGFsO9i+359aFM+2iplnvdToLZrG+rO6yxEQWPr5Tm5nqsZTiZ3wwy446cuQspUsLsX4Ndu268DGNbnqcq1Tb4UcUWUPY7Ly22CT6CAei67NuSSKV0t101zhUUYaXCaPxO+70z18bO2iXylM4u7W9K5d9KaYKyekZvGiB6QkJszRS1912tl1t5q9pk9129FfxHTYt0a8V001oN0ob40+zm9zZV9FuwazaSoK4lu4aVWatSt4oxN6rk9129J6cu6UxM2bkSdxSJKcoKsJ+L8Td4kmlkuga3FL03e4yG1hHRt4laktN+xu7K5ZynoWTOUXgEllkKojRrT+3LqLm6aQDwvevsmxn9WNwINgoE+pR95u9q0rbMqYMk3iOdo4Mu4ZZO6ryV18t2s+L0fODE1CWxLlwLz01K8RuT.HSfqv4K3QQDIqrxxkW+CcnCoYYmKjxaXzW7tqcsKSK9UjYMqYIMu4MWZPCZfb8W+0KO0S8TU4KH7fG7fZV1lMal1YSynK5vCbfCToqWAETftevgYtOjyw5nG8nlVrgu09129z0lQ8I3ob9GPVTQEI4jSNlV7qJwno8xQNxQpqMmum0fp1nvd3Rl5Tmptun91tsaS5Tm5T.JiPEwn6zfNeVWpHNWrXcpSczLiJ3Mt268d0rbwEWrjc1YaJwt5HmeuRDwvS0tmn0st05ZyU+AhNOU4d228caFojDd3gKW+0e8ZZynWCPvo8rm8nqsV0pVYZw+dtm6QyxG4HGwzhcUMIkTR5l1KMBSykVKTXObYye9yWWaCbfCL.jInhDYjQJOwS7DZZqfBJvsNxzFc2Gb3Ce3dct0m9zGcmMgpyewqYvnif9q+5utoD6W60dMcsYzQb0HNWrsc61k3iOduNmdq25sjPBQ6Wc4JmEADbnfBJP2v4pksrkRG5PG75XOfAL.cCaPmO6iUmjSN4TomMzRJoDYEqXE9oLB9CTXObYu268d590+OzC8PU6lifClY2tcYFyXF5J7wcuMgu28tWcs0gNzA44dtmyiysHiLRYDiXD5Z2UKTDFyni.ZzQGsWWb+zl1zzMrFJszRc4gMkQuuNjgLDu5L+z0t1U4YdlmQW6Fs+JBd8y+7Oqqs24cdGuZ3ZEUTQY3MOsp68uXzzd4kKiLxnJ+vQDZQg8vkkYlYJaXCaPSa0nF0vTNJbv6DQDQH8su8U1wN1gDSLwn6u6t2UUWwJVgtKlpPBID4S9jOQl27lmDarw5xii6niNZIgDRP9tu66L7hvc7ie7tUtAsRIkTLr39wN1wJewW7ER6ZW6D61s6RwJrvBS5Tm5jrksrECu33W3BWnKWDvjlzjjhJpHMs0vF1PYSaZSxHG4HkniNZWJN1rYShM1Xk4N24JKXAKPpYMqol+dt4lqLkoLEWJVFw44ya+s.81OP38e+2WWaMu4MW14N2oLnAMH25fEESLwHiZTiR91u8a0MDsb3vgLoIMIuNeqJqxFlMqYMqwOkIveolU9SA3+YZSaZxC+vOrl1dlm4YjANvA5w+p+LxHCorxJyiyocu6cKNb3Pdlm4Y73KRpm3IdBCmsFbUm5TmRxM2bkEtvE5UyI5e4W9ktzrNxkqt0stxu6286J2+91291kYNyY514xPG5PkO+y+bcs2idzCoG8nGhHWXFYohFCm0qd0S2YO3xshUrBtvsLAuwa7FxRVxRz0d6ZW6j10t1IhHxYNyYjRKszxMFW4UdkU3TEXQEUjLzgNTWNmxN6rkoO8oKCZPCR21Y3Ce3xvG9vkRKsT4Lm4LkaLBIjPj5Uu5UgamwMtw4UGww4Lm4HyYNywiW+KJojRRd5m9oqxs8CD88M24NWI93iWZYKaol1qW8pmLwINQQjKTTdgEVXEFmJq+kYO6YKYlYltTNYUs5UuZofBJnbOPLFMe2alZXCanWs+kHW36vN7gOrzqd0KSJqr9T7v28XKaYKpK2V1xV7aa692+9qbV7wGuWG2ryNacwcDiXDtz51ktzEcqqYYvCdvt7+G1111lOIG90e8Wc4bXHCYH9jbvYsqcsyieudiabi9r7xgCGpl1zl5UedRoT90OOOtwMNca+nhJJ+ZNTdO9lu4a7YuWoTJUhIlnamS1rYSc5SeZeVN8y+7O6V4iQ8IZlpr8EBzaeQBN56SDQ0l1zFeRdbQETPAJ61sapeF6vG9vZ1FqbkqzTh6BVvBzD2cu6cap4cJojhguFchSbBSuenoLko3ydOMxHizzyWq3CFJNvsYzQ+04KVy.gF1vFFnSA4Zu1qMPmBWxu8a+lLrgMLuZFOn28t2x2+8euIlUWPd4km77O+yWs+noYl5Uu5kr4MuYeRrW7hWrL3AOX2d8JnfBjt0stIG+3G2zyo8t28JcoKcwziq235ttqqZ612c66a0qd0xPG5PkhKtXSOWxImbjt28tWscZtzYqZUqxv1W+5WueNS7NMpQMJPmBUIPg89XNOrJ71SIk63jm7j5ZynabLtqoLkoH+1u8aZZyUuo33KuQDc1ydVW9457cjOyx4N24b4mq6NjabG6ZW6RhN5nkwN1w5UwY+6e+x8ce2mL5QOZojRJwTxs0rl0HMqYMSl6bmqautN+4G+8E8kQe9MXo3g8u+8KQGczxnF0nLsa3O4latRO5QOj3hKNONFqZUqRZVyZljbxIaJ4TYkUlL4IOYo4Mu4xV25Vcq00W2+ak0+Zfd6KRvQeeWz3F23j669tO2Zp3sxjRJoHMoIMQRIkTLsXdQN2m8u9q+poDWmuAZYFeO8kq79r2RW5RM0siH5ug4YlprglE9eB3m1.q7i3hKN0wO9wUJkRcnCcHU6ae68qa+LxHCUokVpxgCGp0u90aZwcnCcnp7yOekRcgS44RW5Rc40MszRyTO8bm8rmUkQFYnrYylKmC8t281zGh.G+3G2sFpS1saWs8sucud6VXgEpN3AOnZUqZUpDSLQUu6cu8I6KEYjQpd8W+0Uye9yWs0stU0YO6YqzbKu7xSsm8rGUxImrZLiYLpN1wN5U4Pm5TmTG5PGRoTJU94muZnCcn90OOEd3geogxvoO8oUSe5S2ut8cm2qFxPFhZtyctpMu4MqNyYNSk9d0YO6YU+xu7KpTSMU0G9genZfCbfl9PYn8su8pQO5QqRN4jU6YO6Q4vgiJLmb3vg5zm9zpst0spl+7mu5Mey2TEczQ6waea1roBteR6P..f.ZjDQAQUO8zUkUVYtvmrbcEVXgpku7kGzu8EI3nuOid7bO2yolvDlfZkqbkpCbfCnJszRqzsad4km5m9oeRsjkrD0nG8n84e+5y9rO6k997e7G+QSaX3EQDQnxJqrTkVZopCdvCp5ZW6pom6Se5SWUbwEqTJkpjRJQsvEtPexqQQFYjprxJKSc+q7yOe07l277ou2ZkdTi+++A.....pBighC....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fE.E1C....XAPg8.....V.TXO....fEv+GPsvBQaWZlWXB....PRE4DQtJDXBB" ],
					"embed" : 1,
					"forceaspect" : 1,
					"id" : "obj-87",
					"maxclass" : "fpic",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "jit_matrix" ],
					"patching_rect" : [ 364.0, 33.0, 100.0, 19.788918205804748 ],
					"pic" : "SSD-Sys:/Users/swrexperimentalstudio/Desktop/FREEDOM_COLLECTIVE.png",
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.467018469657006, 316.0, 62.532981530343001 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-86",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 490.0, 119.0, 58.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 398.0, 8.467018469657006, 58.0, 22.0 ],
					"text" : "r FC.stop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-85",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 373.0, 116.0, 67.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 322.0, 8.467018469657006, 67.0, 22.0 ],
					"text" : "r FC.scene"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-84",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 968.5, 574.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 211.0, 153.5, 100.0, 20.0 ],
					"text" : "Server response:",
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-83",
					"ignoreclick" : 1,
					"linecount" : 3,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 939.0, 666.5, 50.0, 49.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 315.0, 153.5, 111.0, 22.0 ],
					"text" : "\"started scene 1\""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-81",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 970.0, 635.0, 76.0, 22.0 ],
					"text" : "route /server"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 263.5, 63.0, 22.0, 22.0 ],
					"text" : "t 3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-78",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 194.5, 63.0, 22.0, 22.0 ],
					"text" : "t 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-77",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 124.5, 63.0, 22.0, 22.0 ],
					"text" : "t 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-74",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 51.0, 63.0, 22.0, 22.0 ],
					"text" : "t 0"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-73",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 51.0, 27.0, 72.0, 20.0 ],
					"text" : "waitscreen",
					"textoncolor" : [ 1.0, 1.0, 1.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.368627450980392, 0.368627450980392, 0.368627450980392, 1.0 ],
					"fontface" : 1,
					"fontname" : "Ableton Sans Bold",
					"fontsize" : 18.0,
					"id" : "obj-72",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 263.5, 27.0, 68.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 285.0, 90.0, 64.0, 29.0 ],
					"text" : "3",
					"textoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"usetextovercolor" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.368627450980392, 0.368627450980392, 0.368627450980392, 1.0 ],
					"fontface" : 1,
					"fontname" : "Ableton Sans Bold",
					"fontsize" : 18.0,
					"id" : "obj-71",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 194.5, 27.0, 68.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 211.0, 90.0, 64.0, 29.0 ],
					"text" : "2",
					"textoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"usetextovercolor" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.368627450980392, 0.368627450980392, 0.368627450980392, 1.0 ],
					"fontface" : 1,
					"fontname" : "Ableton Sans Bold",
					"fontsize" : 18.0,
					"id" : "obj-70",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 124.5, 27.0, 68.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 135.0, 90.0, 64.0, 29.0 ],
					"text" : "1",
					"textoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"usetextovercolor" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1000.0, 742.5, 87.0, 33.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 196.0, 181.5, 115.0, 20.0 ],
					"text" : "Current Num Users:",
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"blinkcolor" : [ 0.0, 1.0, 0.011764705882353, 1.0 ],
					"id" : "obj-65",
					"ignoreclick" : 1,
					"maxclass" : "button",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"outlinecolor" : [ 0.349019607843137, 0.349019607843137, 0.349019607843137, 0.0 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 339.0, 588.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 80.5, 84.428571462631226, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgcolor2" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgfillcolor_angle" : 270.0,
					"bgfillcolor_autogradient" : 0.0,
					"bgfillcolor_color" : [ 0.2, 0.2, 0.2, 0.0 ],
					"bgfillcolor_color1" : [ 0.301961, 0.301961, 0.301961, 0.0 ],
					"bgfillcolor_color2" : [ 0.2, 0.2, 0.2, 1.0 ],
					"bgfillcolor_proportion" : 0.5,
					"bgfillcolor_type" : "color",
					"fontsize" : 16.0,
					"gradient" : 1,
					"id" : "obj-63",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 517.0, 609.0, 45.0, 44.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 64.0, 153.5, 78.0, 26.0 ],
					"text" : "0:59:920",
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-61",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 543.0, 574.0, 111.0, 22.0 ],
					"text" : "sprintf %ld:%ld:%ld"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-58",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 507.0, 538.0, 55.0, 22.0 ],
					"text" : "zl.slice 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 507.0, 507.0, 129.0, 22.0 ],
					"text" : "translate ms hh:mm:ss"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-51",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "int", "int" ],
					"patching_rect" : [ 384.0, 366.0, 29.5, 22.0 ],
					"text" : "t i i"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 384.0, 405.0, 45.0, 22.0 ],
					"text" : "0, 1 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 507.0, 467.0, 29.5, 22.0 ],
					"text" : "* 1."
				}

			}
, 			{
				"box" : 				{
					"floatoutput" : 1,
					"id" : "obj-45",
					"knobcolor" : [ 0.23921568627451, 1.0, 0.0, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 358.0, 493.0, 131.0, 13.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 20.0, 181.5, 145.0, 17.0 ],
					"size" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-31",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 495.75, 323.0, 52.0, 22.0 ],
					"text" : "200000."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 437.0, 323.0, 52.0, 22.0 ],
					"text" : "200000."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-29",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 396.0, 530.0, 22.0, 22.0 ],
					"text" : "t 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 382.0, 323.0, 49.0, 22.0 ],
					"text" : "190000"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"patching_rect" : [ 358.0, 432.0, 57.0, 22.0 ],
					"text" : "line 0."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1117.0, 697.0, 55.0, 22.0 ],
					"text" : "00:03:20"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1147.0, 774.0, 142.0, 22.0 ],
					"text" : "200000."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1117.0, 731.0, 129.0, 22.0 ],
					"text" : "translate hh:mm:ss ms"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-17",
					"maxclass" : "newobj",
					"numinlets" : 4,
					"numoutlets" : 4,
					"outlettype" : [ "bang", "bang", "bang", "" ],
					"patching_rect" : [ 382.0, 293.0, 133.5, 22.0 ],
					"text" : "sel 1 2 3"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "int", "int", "stop", "int" ],
					"patching_rect" : [ 51.0, 257.0, 60.0, 22.0 ],
					"text" : "t i i stop 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "/stop" ],
					"patching_rect" : [ 294.0, 588.0, 41.0, 22.0 ],
					"text" : "t /stop"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 294.0, 550.0, 69.0, 22.0 ],
					"text" : "metro 2000"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 783.0, 784.0, 138.0, 22.0 ],
					"text" : "udpsend 127.0.0.1 3333"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"ignoreclick" : 1,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 996.0, 718.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 315.0, 181.5, 50.0, 22.0 ],
					"text" : "1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 1027.0, 680.0, 72.0, 22.0 ],
					"text" : "route /users"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 783.0, 706.0, 126.0, 22.0 ],
					"text" : "metro 2000 @active 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-37",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 783.0, 748.0, 41.0, 22.0 ],
					"text" : "/users"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 970.0, 599.0, 97.0, 22.0 ],
					"text" : "udpreceive 5555"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontsize" : 16.0,
					"id" : "obj-35",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 55.0, 116.0, 207.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 211.0, 64.0, 81.0, 24.0 ],
					"text" : "Scene",
					"textcolor" : [ 1.0, 1.0, 1.0, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 1.0, 0.0, 0.0, 1.0 ],
					"id" : "obj-16",
					"maxclass" : "textbutton",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 212.0, 173.0, 100.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 16.0, 90.0, 84.0, 29.0 ],
					"text" : "STOP/WAIT",
					"textoncolor" : [ 0.850980392156863, 0.850980392156863, 0.850980392156863, 1.0 ],
					"textovercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
					"usetextovercolor" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "/stop", "int", "stop", "int" ],
					"patching_rect" : [ 212.0, 229.0, 87.0, 22.0 ],
					"text" : "t /stop 1 stop 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"patching_rect" : [ 51.0, 191.0, 29.5, 22.0 ],
					"text" : "i"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 51.0, 302.0, 83.0, 22.0 ],
					"text" : "prepend /start"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 51.0, 538.0, 138.0, 22.0 ],
					"text" : "udpsend 127.0.0.1 3333"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"midpoints" : [ 74.166666666666657, 289.0, 391.5, 289.0 ],
					"order" : 2,
					"source" : [ "obj-10", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"midpoints" : [ 74.166666666666657, 282.0, 369.0, 282.0, 369.0, 282.0, 636.0, 282.0, 636.0, 114.0, 904.0, 114.0 ],
					"order" : 0,
					"source" : [ "obj-10", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"midpoints" : [ 87.833333333333329, 289.0, 367.5, 289.0 ],
					"source" : [ "obj-10", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 74.166666666666657, 282.0, 369.0, 282.0, 369.0, 281.0, 636.0, 281.0, 636.0, 123.0, 660.0, 123.0 ],
					"order" : 1,
					"source" : [ "obj-10", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"midpoints" : [ 101.5, 289.0, 303.5, 289.0 ],
					"source" : [ "obj-10", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-81", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 1 ],
					"source" : [ "obj-12", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"midpoints" : [ 289.5, 252.0, 636.0, 252.0, 636.0, 114.0, 904.0, 114.0 ],
					"order" : 0,
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"order" : 2,
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-15", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"midpoints" : [ 289.5, 252.0, 636.0, 252.0, 636.0, 123.0, 660.0, 123.0 ],
					"order" : 1,
					"source" : [ "obj-15", 3 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"midpoints" : [ 244.166666666666686, 535.0, 303.5, 535.0 ],
					"source" : [ "obj-15", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"source" : [ "obj-17", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-31", 0 ],
					"source" : [ "obj-17", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 1 ],
					"source" : [ "obj-18", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-21", 1 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 1 ],
					"source" : [ "obj-20", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-29", 0 ],
					"source" : [ "obj-26", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"order" : 1,
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"order" : 0,
					"source" : [ "obj-26", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-29", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-7", 0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-37", 0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 1 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"source" : [ "obj-48", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 1 ],
					"source" : [ "obj-5", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-5", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 1 ],
					"midpoints" : [ 404.0, 391.0, 527.0, 391.0 ],
					"source" : [ "obj-51", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-51", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-58", 0 ],
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-61", 0 ],
					"source" : [ "obj-58", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 1 ],
					"source" : [ "obj-61", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-77", 0 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-78", 0 ],
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-79", 0 ],
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-74", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-74", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-77", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-78", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-79", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"order" : 0,
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"order" : 1,
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-81", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-83", 1 ],
					"source" : [ "obj-81", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-85", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"source" : [ "obj-86", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-12" : [ "live.gain~", "Front", 0 ],
			"obj-20" : [ "live.gain~[1]", "Back", 0 ],
			"parameterbanks" : 			{
				"0" : 				{
					"index" : 0,
					"name" : "",
					"parameters" : [ "-", "-", "-", "-", "-", "-", "-", "-" ]
				}

			}
,
			"inherited_shortname" : 1
		}
,
		"dependency_cache" : [ 			{
				"name" : "FLT_PA_Back.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
, 			{
				"name" : "FLT_PA_Front.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
, 			{
				"name" : "FREEDOM_COLLECTIVE.png",
				"bootpath" : "~/Desktop",
				"patcherrelativepath" : "../../../Desktop",
				"type" : "PNG",
				"implicit" : 1
			}
, 			{
				"name" : "NOT_PA_Back.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
, 			{
				"name" : "NOT_PA_Front.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
, 			{
				"name" : "PNO_PA_Back.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
, 			{
				"name" : "PNO_PA_Front.mp3",
				"bootpath" : "~/Documents/GitHub/MSync",
				"patcherrelativepath" : ".",
				"type" : "Mp3",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ]
	}

}

if winexists("C:\WINDOWS\system32\cmd.exe") Then
WinActivate("C:\WINDOWS\system32\cmd.exe")

Send("say Server is Shutting Down")
Send("{Enter}")
Sleep(3000)

Send("save-all")
Send("{Enter}")
Sleep(3000)

Send("stop")
Send("{Enter}")
Sleep(3000)

Send("{CTRLDOWN}")
Sleep(500)
Send("{c}")
Sleep(500)
Send("{CTRLUP}")
Sleep(500)

Send("y")
Send("{Enter}")

EndIf
<html>    
    <head>
        <script>
            function validateForm(){
                var image = document.getElementById("image").value;
                var name = document.getElementById("name").value;
                if (image =='')
                {
                    return false;
                }
                if(name =='')
                {
                    return false;
                } 
                else 
                {
                    return true;
                } 
                return false;
            }
        </script>
    </head>

    <body>
        <form method="post" action="up.php" enctype="multipart/form-data">
            <input type="text" name="ext" size="30"/>
            <input type="text" name="name" id="name" size="30"/>
            <input type="file" accept="image/*" name="image" id="image" />
            <input type="submit" value='Save' onclick="return validateForm()"/>
        </form>
    </body>
</html>



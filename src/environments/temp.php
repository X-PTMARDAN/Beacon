<?php
include 'header_admin_new.php';
include 'includes/connection.php';
?>
<link href="css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<link href="css/toast.css" rel="stylesheet">
<script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
<link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />


<div class="container-fluid border p-0 m-0 h-100" >
    <div class="row">
  <div class="col-3">
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <a class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Sales By Permit</a>
      <a class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Sales By Report</a>
      <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">extra</a>
      <a class="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">extra</a>
    </div>
  </div>
  
  
  <div class="col-9">
    <div class="row">
        <div class="col">
            <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"> 
      form1
      <form class="form" method="POST" action="report_admin.php">
              <div class="row">
                <div class="col">
                  <select name="ASSIGNED_TO"class="form-control">
                    <option>Wendy Hall</option>
                </select>
                </div>
                <div class="col">
                  <select name="STATUS" class="form-control">
                     <option val="New">New</option>
                     <option val="In Process">In Process</option>
                     <option val="Submitted to Agency">Submitted to Agency</option>
                       <option val="Waiting On Documents" > Waiting On Documents</option>
                      <option val="Pending Payment" > Pending Payment</option>
                      <option val="On Hold" > On Hold</option>
                      <option val="Completed" > Completed</option>
                      <option val="Withdrawn" > Withdrawn</option>
                      <option val="No Reponse" > No Reponse</option>
                </select>
                </div>
                <br > 
                <div class="col">
                    <input id="datepicker1" name="from_date" placeholder="start date" class="form-control" />
                        <script>
                            $('#datepicker1').datepicker({
                                uiLibrary: 'bootstrap4'
                            });
                        </script>
                </div>
                 <div class="col">
                    <input id="datepicker2" name="to_date" placeholder="end date" class="form-control" />
                      <script>
                            $('#datepicker2').datepicker({
                                uiLibrary: 'bootstrap4'
                            });
                        </script>
                </div>
              </div>
              <br>
              <input name="val" id="val" value="1" type="hidden" />
              <button class="btn btn-primary" type=submit >SUBMIT</button>
            </form>
            
            
            
      </div>
      <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
          form2
            <form class="form" method="POST" action="report_admin.php">
              <div class="row">
                <div class="col">
                  <select name="ASSIGNED_TO"class="form-control">
                    <option>Wendy Hall</option>
                </select>
                </div>
                <div class="col">
                  <select name="STATUS" class="form-control">
                     <option val="New">New</option>
                     <option val="In Process">In Process</option>
                     <option val="Submitted to Agency">Submitted to Agency</option>
                       <option val="Waiting On Documents" > Waiting On Documents</option>
                      <option val="Pending Payment" > Pending Payment</option>
                      <option val="On Hold" > On Hold</option>
                      <option val="Completed" > Completed</option>
                      <option val="Withdrawn" > Withdrawn</option>
                      <option val="No Reponse" > No Reponse</option>
                </select>
                </div>
                <br > 
                <div class="col">
                    <input id="datepicker1" name="from_date" placeholder="start date" class="form-control" />
                        <script>
                            $('#datepicker1').datepicker({
                                uiLibrary: 'bootstrap4'
                            });
                        </script>
                </div>
                 <div class="col">
                    <input id="datepicker2" name="to_date" placeholder="end date" class="form-control" />
                      <script>
                            $('#datepicker2').datepicker({
                                uiLibrary: 'bootstrap4'
                            });
                        </script>
                </div>
              </div>
              <br>
              <input name="val" id="val" value="1" type="hidden" />
              <button class="btn btn-primary" type=submit >SUBMIT</button>
            </form>
      </div>
      <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
      <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
    </div>
        </div>
     </div>
     <div class="row">
          <table id="example" class="table table-hover">

                            <tbody>
                                <?php
            
                
                $from_date_post = $_POST['from_date']; // 02/26/2020
                $from_date_explode = explode('/', $from_date_post);
                $month = $from_date_explode[0];
                $day   = $from_date_explode[1];
                $year  = $from_date_explode[2];
                
                $from_date_0 = $year."-".$month."-".$day;
                
                $from_date = substr($from_date_0, 1, -1);
                
                
                $to_post = $_POST['to_date']; // 02/26/2020
                $from_date_explode1 = explode('/', $to_post);
                $month1 = $from_date_explode1[0];
                $day1   = $from_date_explode1[1];
                $year1  = $from_date_explode1[2];
                
                $from_date11 = $year1."-".$month1."-".$day1;
                
                //sales_report=1;
                
                $from_date1 = substr($from_date11, 1, -1);
                
                if($_POST['val']==1)
                {
                    
                $query = "SELECT * FROM permit_name INNER JOIN proposal ON proposal.PERMIT_NAME = permit_name.PERMIT_NAME  where DATE_ADDED  BETWEEN '".$from_date."' AND '".$from_date1."' AND PROJECT_MANAGER='".$_POST['ASSIGNED_TO']."' AND STATUS ='".$_POST['STATUS']."'";
                
                //echo $query;
                $con=new mysqli($host,$username,$password,$db);
                $result=mysqli_query($con,$query);
                  ?>

                                <thead class="thead-dark">
                                    <tr>
                                        <th>PROJECT NAME</th>
                                        <th>PERMIT NAME</th>
                                        <th>TYPE</th>
                                        <th>DESCRIPTION</th>
                                        <th>ACTVIITY TITLE</th>
                                        <th>ACTVIITY STATUS</th>
                                        <th>CONTRACT TOTAL</th>
                                    </tr>
                                </thead>
                                <?php
                while($rows = mysqli_fetch_array($result)){
                ?>
                                <tr>
                                    <td><?php echo $rows["PROJECT_NAME"]?></td>
                                    <td><?php echo $rows["PERMIT_NAME"]?></td>
                                    <td><?php echo $rows["PROJECT_TYPE"]?></td>
                                    <td><?php echo $rows["DESCRIPTION"]?></td>

                                    <td><?php echo $rows["ACTIVITY_TITLE"]?></td>
                                    <td><?php echo $rows["ACTIVITY_STATUS"]?></td>

                                    <td><?php echo $rows["CONTRACT_TOTAL"]?></td>

                                </tr>


                                <?php }
                }
                //Sales By Permit
                else if($_POST['val']==2)
                {
                    //echo $_POST['STATUS'];
                     $query = "SELECT * FROM permit_name where DATE_ADDED  BETWEEN '".$from_date."' AND '".$from_date1."' AND PROJECT_MANAGER='".$_POST['ASSIGNED_TO']."'";
                
                //echo $query;
                $con=new mysqli($host,$username,$password,$db);
                $result=mysqli_query($con,$query);
                  ?>

                                <thead class="thead-dark">
                                    <tr>
                                        <th>PERMIT</th>
                                        <th>PERMIT NAME</th>
                                        <th>DESCRIPTION</th>
                                        <th>TOTAL</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <?php
                while($rows = mysqli_fetch_array($result)){
                ?>
                                <tr>
                                    <td><?php echo $rows["PERMIT_NO"]?></td>
                                    <td><?php echo $rows["PROJECT_NAME"]?></td>
                                    <td><?php echo $rows["DESCRIPTION"]?></td>
                                    <td><?php echo $rows["CONTRACT_TOTAL"]?></td>

                                    <td><?php echo $rows["STATUS"]?></td>
                                </tr>


                                <?php }
                }
                        // Project Report
                               else if($_POST['val']==3)
                {
                     $query = "SELECT * FROM permit_name where DATE_ADDED  BETWEEN '".$from_date."' AND '".$from_date1."' AND PROJECT_MANAGER='".$_POST['ASSIGNED_TO']."'";
                
                //echo $query;
                $con=new mysqli($host,$username,$password,$db);
                $result=mysqli_query($con,$query);
                ?>

                                <thead class="thead-dark">
                                    <tr>
                                        <th>PERMIT</th>
                                        <th>PERMIT NAME</th>
                                        <th>DESCRIPTION</th>
                                        <th>STATUS</th>
                                        <th>DATE ADDED</th>
                                    </tr>
                                    </head>
                                    <?php
                while($rows = mysqli_fetch_array($result)){
                ?>
                                    <tr>
                                        <td><?php echo $rows["PERMIT_NO"]?></td>
                                        <td><?php echo $rows["PROJECT_NAME"]?></td>
                                        <td><?php echo $rows["DESCRIPTION"]?></td>
                                        <td><?php echo $rows["STATUS"]?></td>
                                        <td><?php echo $rows["DATE_ADDED"]?></td>

                                        <td><?php echo $rows["CONTRACT_TOTAL"]?></td>
                                    </tr>


                                    <?php }
                }
                
                
                
                 else if($_POST['val']==4)
                {
                
                    $like=$_POST['project_lookup'];
                    
                    //echo $like;
                    $like=$like."%";
                     $query = "SELECT * FROM permit_name WHERE PERMIT_NAME LIKE '".$like."'";
                
                //echo $query;
                $con=new mysqli($host,$username,$password,$db);
                $result=mysqli_query($con,$query);
                 ?>

                                    <thead class="thead-dark">
                                        <tr>
                                            <th>PERMIT_NUMBER</th>
                                            <th>PROJECT NAME</th>
                                            <th>STATUS</th>
                                            <th>CONTRACT</th>
                                        </tr>
                                    </thead>
                                    <?php
                while($rows = mysqli_fetch_array($result)){
                ?>
                                    <tr>
                                        <td><?php echo $rows["PERMIT_NO"]?></td>
                                        <td><?php echo $rows["PROJECT_NAME"]?></td>
                                        <td><?php echo $rows["STATUS"]?></td>

                                        <td><?php echo $rows["CONTRACT_TOTAL"]?></td>
                                    </tr>


                                    <?php }
                }
                
                ?>
                            </tbody>
                        </table>
     </div>
  </div>
</div>
    
    
    
    
    
   


<div id="wrapper">
    
    <!-- Page Content -->
    <div id="page-content-wrapper">
        <div class="container-fluid xyz">
            <div class="row">
                <div class="col-lg-12">
                    <div class="container">
                        <!--<h3>Report Title</h3>-->



                        <button id="pdf" class="btn btn-md btn-success"
                            style="float:right;margin-right:106px;margin-bottom:7px;"> Export to PDF</button>



                       
                    </div>




                </div>
            </div>
        </div>
    </div>
    <!-- /#page-content-wrapper -->
</div>
<!-- /#wrapper -->
<!-- you need to include the shieldui css and js assets in order for the components to work -->
<link rel="stylesheet" type="text/css" href="https://www.shieldui.com/shared/components/latest/css/light/all.min.css" />
<script type="text/javascript" src="https://www.shieldui.com/shared/components/latest/js/shieldui-all.min.js"></script>
<script type="text/javascript" src="https://www.shieldui.com/shared/components/latest/js/jszip.min.js"></script>

<script type="text/javascript">
    jQuery(function ($) {
        $("#exportButton").click(function () {
            // parse the HTML table element having an id=exportTable
            var dataSource = shield.DataSource.create({
                data: "#exportTable",
                schema: {
                    type: "table",
                    fields: {
                        PROJECT_NAME: { type: String },
                        PERMIT_NAME: { type: String },
                        JURISDICTION: { type: String }
                    }
                }
            });

            // when parsing is done, export the data to PDF
            dataSource.read().then(function (data) {
                var pdf = new shield.exp.PDFDocument({
                    author: "PrepBootstrap",
                    created: new Date()
                });

                pdf.addPage("a4", "portrait");

                pdf.table(
                    50,
                    50,
                    data,
                    [
                        { field: "PROJECT NAME", title: "PROJECT NAME", width: 200 },
                        { field: "PERMIT_NAME", title: "PERMIT NAME", width: 200 },
                        { field: "JURISDICTION", title: "JURISDICTION", width: 200 }
                    ],
                    {
                        margins: {
                            top: 50,
                            left: 50
                        }
                    }
                );

                pdf.saveAs({
                    fileName: "PrepBootstrapPDF"
                });
            });
        });
    });
</script>

<script>


    function getUrlParam(parameter, defaultvalue) {
        var urlparameter = defaultvalue;
        if (window.location.href.indexOf(parameter) > -1) {
            urlparameter = getUrlVars()[parameter];
        }
        return urlparameter;
    }


    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        return vars;
    }


    var mytext = getUrlParam('val', 'Empty');


    if (mytext == "Empty") {
        //alert("first"+mytext);
        var g = '<?php echo $_POST['val'];?>';
        mytext = g;
        //alert("second"+mytext);
    }
    //alert(mytext);
    if (mytext == 1 || mytext == "1") {
        document.getElementById('STATUS').style.display = "block";

        document.getElementById('project_lookup').style.display = "none";

        document.getElementById('val').value = 1;
    }


    if (mytext == 2 || mytext == "2") {
        document.getElementById('STATUS').style.display = "none";
        document.getElementById('project_lookup').style.display = "none";

        document.getElementById('val').value = 2;
    }

    if (mytext == 3 || mytext == "3") {
        document.getElementById('STATUS').style.display = "none";
        document.getElementById('project_lookup').style.display = "none";

        document.getElementById('val').value = 3;
    }

    if (mytext == 4 || mytext == "4") {

        alert("SDF");
        document.getElementById('project_lookup').style.display = "block";

        document.getElementById('STATUS').style.display = "none";

        document.getElementById('val').value = 4;


        document.getElementById('STATUS').style.display = "none";

        document.getElementById('to_date').style.display = "none";

        document.getElementById('from_date').style.display = "none";

        document.getElementById('ASSIGNED_TO').style.display = "none";


        document.getElementById('PROJECT_MANAGER').style.display = "none";





        document.getElementById('val').value = 4;
    }

</script>

<style>
    #exportButton {
        border-radius: 0;
    }
</style>

<!-- Export a Table to PDF - END -->
<!--sandeep start-->
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="js/jspdf.min.js"></script>
<script src="js/jspdf.plugin.autotable.min.js"></script>
<script src="js/tableHTMLExport.js"></script>

<script>
    $('#json').on('click', function () {
        $("#example").tableHTMLExport({ type: 'json', filename: 'sample.json' });
    })
    $('#csv').on('click', function () {
        $("#example").tableHTMLExport({ type: 'csv', filename: 'sample.csv' });
    })
    $('#pdf').on('click', function () {
        $("#example").tableHTMLExport({ type: 'pdf', filename: 'sample.pdf' });
    })
</script>
<!--sandeep end-->
</body>

</html>